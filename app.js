const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const https = require('https')
const { STATUS_CODES } = require('http')

const app = express()
app.use(express.static("public"));


app.use(bodyParser.urlencoded({extended:true}))
app.get('/', (req,res)=>{
    res.sendFile(__dirname + "/signup.html")
})

app.post('/', (req,res) => {
    const fName = req.body.firstName
    const lName = req.body.lastName
    const email = req.body.email
    

    const data = {
        members:[
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: fName,
                    LNAME: lName
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data)

    const url = "https://us10.api.mailchimp.com/3.0/lists/5b6120a915"

    const options = {
        method: "POST",
        auth: "kal:a7c01b2fae83b0e502aa19900ba29034-us10"
    }

    const request = https.request(url, options, (response)=>{
        if(response.statusCode === 200){
            res.sendFile(__dirname + '/success.html')
        }else{
            res.sendFile(__dirname + '/failure.html')
        }
        response.on("data", (data)=>{
        })
    })
    request.write(jsonData);
    request.end();

})

app.post('/failure', (req,res) =>{
    res.redirect('/')
})

// Apikey
// a7c01b2fae83b0e502aa19900ba29034-us10
// listID
// 5b6120a915

app.listen(3000, ()=>{
    console.log('Server running at port 3000');
})