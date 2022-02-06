const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.post('/', (req, res) => {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    // console.log(firstName + " " + lastName, email); 
    const data ={
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    }

    const jsonData = JSON.stringify(data);
    const url = "https://us14.api.mailchimp.com/3.0/lists/ceac696f5a"
    const options = {
        method: "POST",
        auth: "dikiogres:f794cacb541bff069cb2a8ae16e3fe54-us14"
    }

    const request = https.request(url, options, (response) =>{

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", (data) =>{
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

});

app.post("/failure", (req, res) =>{
    res.redirect("/");
})


app.listen(procces.env.PORT || 3000, ()=> {
    console.log('listening on http://localhost:3000/');
});

//API KEy
// f794cacb541bff069cb2a8ae16e3fe54-us14

//list id
//ceac696f5a