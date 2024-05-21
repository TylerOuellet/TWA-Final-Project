const express = require('express')
const app = express()
const morgan = require('morgan');
const { exec } = require('child_process');
const { stderr } = require('process');
const { error } = require('console');
const path = require('path')
const cors = require('cors')
app.use(morgan('tiny'));
const fs = require('fs/promises')
//CORS
app.use(cors({
    origin:'http://twa-dbfinalproject-env.eba-xi3z89mr.us-east-1.elasticbeanstalk.com/'
}))

//Health route
app.get("/health",function(req,res){
    res.status(200)
    res.send({"message" : "Healthy!"})
})

//Static route for frontend
app.use('/', express.static(path.join(__dirname, 'dist')))
//Gets a list of countries
app.get("/countries", function(req,res){
    //Python script execution
    const countryScript = exec('python3 ./scripts/return_countries.py', (err, stdout, stderr)=>{
        let output = `${stdout}`
        if(err){
            console.log(`Error in script: ${stderr}`)
            res.status(500)
            res.send({error : "Something went wrong getting countries"})
            return
        }

        //trim the output list and convert it to a workable array
        output = `${stdout.trim()}`
        output = output.replace('[','').replace(']','').replace(/^'|'$/g, '')
        console.log('output: ', output);
        output = output.split("', '")

        //send results
        res.status(200)
        res.send({"Countries" : output})
    })
})

//This is graph 1
app.get("/lineEnergyConsumption", async function(req,res){
    const inputCountry = req.query.country
    //Checks if query parameter is empty
    if (!inputCountry){
        res.status(400)
        res.send({"Message: " : "No country query parameter"})
        return
    }

    // python script 
    const countryScript = exec(`python3 ./scripts/first_graph.py ${inputCountry}`, async (err, stdout, stderr)=>{
        output = `${stdout}`
        //Check if the script fails
        if(err){
            console.log(`Error in script: ${stdout}`)
            res.status(500)
            res.send({"message" : "Script Failed!"})
            return
        }
        //Handle the file
        const filepath = __dirname + "/output/first_graph.png"
        try{
            await fs.access(filepath)
            res.status(200)
            res.sendFile(filepath, async (err) => {
                if (err) {
                    console.log('Error sending file:', err);
                    res.status(500)
                    res.send({error: "server messed up"});
                    return
                }
                try {
                    await fs.rm(filepath);
                } catch (error) {
                    console.log('error: ', error);  
                }
            })   
        }catch(error){
            //This checks if the file exists
            console.log('File does not exist:', error);
            res.status(404)
            res.send({error: "There may be no data for the supplied country"});
        }
    })
})


//This is graph 2
app.get("/sustainablePieCharts", function(req, res){
    const year = req.query.year
    let countries = req.query.countries
    //Checks for query parameters
    if (!year || !countries){
        res.status(400)
        res.send({"message" : "no year or country"})
        return
    }
    //Checks if there is more than 5 countries
    if(countries.split(",").length >= 5){
        console.log('countries.split(",").length: ', countries.split(",").length);

        res.status(400)
        res.send({"message" : "too many countries"})
        return
    }
    //split countries
    countries = countries.split(",").join(" ")
    console.log('countries: ', countries);

    //python script
    const graphingScript = exec(`python3 ./scripts/second_graph.py ${year} ${countries}`, async (err, stdout, stderr)=>{
        console.log('`python ./scripts/second.py ${year} ${countries}`: ', `python ./scripts/second.py ${year} ${countries}`);
        if(err){
            //handles script error
            console.log(`Error in script: ${stderr}`)
            res.status(500)
            res.send({"message" : "Script Error!"})
            return
        }
        const filepath = __dirname + "/output/second_graph.png"
        try{
            await fs.access(filepath)
            res.status(200)
            //sends the file
            res.sendFile(filepath, async (err) => {
                if (err) {
                    console.log('Error sending file:', err);
                    res.status(500)
                    res.send({error: "server messed up"});
                    return
                }
                try {
                    await fs.rm(filepath);
                } catch (error) {
                    console.log('error: ', error);  
                }
            })   
        }catch(error){
            //This triggers if the file does not exist
            console.log('File does not exist:', error);
            res.status(404)
            res.send({error: "There may be no data for the supplied country"});
        }
    })
})

//this is graph3
app.get("/barCountryComparison", function (req, res){
    const type = req.query.type
    console.log('type: ', type);

    //validates query parameters
    if(type !== "gdp" && type !== "greenhouse_gas_emissions" && type !== "population"){
        res.status(400)
        res.send({message : "Type must be gdp, greenhouse_gas_emissions or population"})
        return
    }
    const graphingScript = exec(`python3 ./scripts/third_graph.py ${type}`, async (err, stdout, stderr)=>{
        if(err){
            //Looks for script errors
            console.log(`Error in script: ${stderr}`)
            res.status(500)
            res.send({"message" : "Script Error!"})
            return
        }
        const filepath = __dirname + "/output/third_graph.png"
        try{
            await fs.access(filepath)
            res.status(200)
            //sends the file
            res.sendFile(filepath, async (err) => {
                if (err) {
                    console.log('Error sending file:', err);
                    res.status(500)
                    res.send({error: "server messed up"});
                    return
                }
                try {
                    await fs.rm(filepath);
                } catch (error) {
                    console.log('error: ', error);  
                }
            })   
        }catch(error){
            //handles if there is no file for some reason
            console.log('File does not exist:', error);
            res.status(500)
            res.send({error: "Something went wrong..."});
        }
    })
})

//graph 4
app.get("/oilProductionBar", function (req,res){
    const country1 = req.query.country1
    const country2 = req.query.country2
    const year = req.query.year
    //validates query parameters
    if (!country1 || !country2 || !year){
        res.status(400)
        res.send({"Message: " : "No country 1, 2 and or year param"})
        return
    }

    //Python script that execution
    const graphingScript = exec(`python3 ./scripts/fourth_graph.py ${country1} ${country2} ${year}`, async (err, stdout, stderr)=>{
        output = `${stdout}`
        if(err){
            //handles script errors
            console.log(`Error in script: ${stderr}`)
            res.status(500)
            res.send({"message" : "Script error: params may be bad"})
            return
        }
        const filepath = __dirname + "/output/fourth_graph.png"
        try{
            //send the file
            await fs.access(filepath)
            res.status(200)
            res.sendFile(filepath, async (err) => {
                if (err) {
                    console.log('Error sending file:', err);
                    res.status(500)
                    res.send({error: "server messed up"});
                    return
                }
                try {
                    await fs.rm(filepath);
                } catch (error) {
                    console.log('error: ', error);  
                }
            })   
        }catch(error){
            //Handles if there is no file
            console.log('File does not exist:', error);
            res.status(404)
            res.send({error: "country may not have data"});
        }
    })
})
//Testing route
app.get("/pythonTest",async function(req,res){
    const testParam = "TESTPARAMETER"
    const pythonTest = exec(`python3 pythonTest.py ${testParam}`, (error, stdout, stderr)=>{
        if(error){
            console.log(`Error in python script: ${stdout}`)
            res.status(500)
            return
        } 
        pythonOutput = `Python output: ${stdout}`
        res.status(200)
        res.send({"message" : `Python output: ${stdout}`})
        return
    })
    pythonTest.stdin.end()
})

//testing route
app.get("/imageTest", function(req,res){
    res.status(200)
    res.sendFile(__dirname + "/images/testimage.png")
})

//Port stuff
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("Server listening on port " + port)
})