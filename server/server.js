const express = require('express')
const app = express()
const morgan = require('morgan');
const { exec } = require('child_process');
const { stderr } = require('process');
const { error } = require('console');
const path = require('path')
app.use(morgan('tiny'));
const fs = require('fs/promises')

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
            console.log(`Error in script: ${stdout}`)
            res.status(500)
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
    inputCountry = req.query.country
    //let availableCountries =[]
    if (!inputCountry){
        res.status(400)
        res.send({"Message: " : "No country query parameter"})
        return
    }

    const countryScript = exec(`python ./scripts/first_graph.py ${inputCountry}`, (err, stdout, stderr)=>{
        output = `${stdout}`
        if(err){
            console.log(`Error in script: ${stdout}`)
            res.status(400)
            res.send({"message" : "Country not available or not a valid country"})
            return
        }
        res.status(200)
        res.sendFile(__dirname + "/output/g1.png")
        fs.rm("./output/g1.png")
    })
    


})

//This is graph 2
app.get("/sustainablePieCharts", function(req, res){
    res.status(200)
    //placeholder image 
    res.sendFile(__dirname + "/images/testimage.png")
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