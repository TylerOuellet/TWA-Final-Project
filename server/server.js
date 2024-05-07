const express = require('express')
const app = express()
const morgan = require('morgan');
const { exec } = require('child_process');
const { stderr } = require('process');

app.use(morgan('tiny'));

app.get("/health",function(req,res){
    res.status(200)
    res.send({"message" : "Healthy!"})
})
//Gets a list of countries
//CALL THE FUNCTION IN THE PYTHON SCRIPT DON'T FORGET
app.get("/countries", function(req,res){
    res.status(200)
    res.send({Countries : ["Canada" , "France", "Spain"]})

})

//This is graph 1
app.get("/lineEnergyConsumption", function(req,res){
    res.status(200)
    //placeholder image 
    res.sendFile(__dirname + "/images/testimage.png")

})

//This is graph 2
app.get("/sustainablePieCharts", function(req, res){
    res.status(200)
    //placeholder image 
    res.sendFile(__dirname + "/images/testimage.png")
})
app.get("/pythonTest",async function(req,res){
    const testParam = "TESTPARAMETER"
    const pythonTest = await exec(`python pythonTest.py ${testParam}`, (error, stdout, stderr)=>{
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