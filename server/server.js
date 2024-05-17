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
app.use(cors())
app.get("/health",function(req,res){
    res.status(200)
    res.send({"message" : "Healthy!"})
})
//Gets a list of countries
//CALL THE FUNCTION IN THE PYTHON SCRIPT DON'T FORGET
app.get("/countries", function(req,res){
    const countryScript = exec('python ./scripts/return_countries.py', (err, stdout, stderr)=>{
        let output = `${stdout}`
        if(err){
            console.log(`Error in script: ${stderr}`)
            res.status(500)
            res.send({error : "Something went wrong getting countries"})
            return
        }
        output = `${stdout.trim()}`
        output = output.replace('[','').replace(']','').replace(/^'|'$/g, '')
        console.log('output: ', output);
        output = output.split("', '")

        res.status(200)
        res.send({"Countries" : output})
    })
})

//This is graph 1
app.get("/lineEnergyConsumption", async function(req,res){
    const inputCountry = req.query.country
    //let availableCountries =[]
    if (!inputCountry){
        res.status(400)
        res.send({"Message: " : "No country query parameter"})
        return
    }

    const countryScript = exec(`python ./scripts/first_graph.py ${inputCountry}`, async (err, stdout, stderr)=>{
        output = `${stdout}`
        if(err){
            console.log(`Error in script: ${stdout}`)
            res.status(500)
            res.send({"message" : "Script Failed!"})
            return
        }
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

    if (!year || !countries){
        res.status(400)
        res.send({"message" : "no year or country"})
        return
    }
    if(countries.split(",").length >= 5){
        console.log('countries.split(",").length: ', countries.split(",").length);

        res.status(400)
        res.send({"message" : "too many countries"})
        return
    }
    countries = countries.split(",").join(" ")
    console.log('countries: ', countries);
    const graphingScript = exec(`python ./scripts/second_graph.py ${year} ${countries}`, async (err, stdout, stderr)=>{
        console.log('`python ./scripts/second.py ${year} ${countries}`: ', `python ./scripts/second.py ${year} ${countries}`);
        if(err){
            console.log(`Error in script: ${stderr}`)
            res.status(500)
            res.send({"message" : "Script Error!"})
            return
        }
        const filepath = __dirname + "/output/second_graph.png"
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
            console.log('File does not exist:', error);
            res.status(404)
            res.send({error: "There may be no data for the supplied country"});
        }
    })
})
app.get("/barCountryComparison", function (req, res){
    const type = req.query.type
    console.log('type: ', type);
    if(type !== "gdp" && type !== "greenhouse_gas_emissions" && type !== "population"){
        res.status(400)
        res.send({message : "Type must be gdp, greenhouse_gas_emissions or population"})
        return
    }

    console.log("Parameter Achnolaged: ", type)
    res.sendFile(__dirname + "/images/testimage.png")
})

//graph 4
app.get("/oilProductionBar", function (req,res){
    const country1 = req.query.country1
    const country2 = req.query.country2
    const year = req.query.year
    //let availableCountries =[]
    if (!country1 || !country2 || !year){
        res.status(400)
        res.send({"Message: " : "No country 1, 2 and or year param"})
        return
    }

    const graphingScript = exec(`python ./scripts/fourth_graph.py ${country1} ${country2} ${year}`, async (err, stdout, stderr)=>{
        output = `${stdout}`
        if(err){
            console.log(`Error in script: ${stderr}`)
            res.status(500)
            res.send({"message" : "Script error: params may be bad"})
            return
        }
        const filepath = __dirname + "/output/fourth_graph.png"
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
            console.log('File does not exist:', error);
            res.status(404)
            res.send({error: "country may not have data"});
        }
    })
})
app.get("/pythonTest",async function(req,res){
    const testParam = "TESTPARAMETER"
    const pythonTest = exec(`python pythonTest.py ${testParam}`, (error, stdout, stderr)=>{
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


app.get("/imageTest", function(req,res){
    res.status(200)
    res.sendFile(__dirname + "/images/testimage.png")
})

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("Server listening on port " + port)
})