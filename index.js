// Requirng global modules from node package manager
var express = require('express');
var body_parser = require('body-parser');

// Requiring mongoose and making connection with mongolab
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://akshit:akshit@ds133814.mlab.com:33814/council_employees', (err) => {
    if(err){
        console.log("failed to connect with database")
    }else{
        console.log("Successfully connected to database");
    }
});

var ejs = require('ejs');
var ejs_mate = require('ejs-mate');

const port = process.env.PORT || 3000;

// Requiring schema from schema.js
var {storage} = require('./schema/schema.js');
var {wholedata} = require('./schema/schema.js');
var emails = mongoose.model('emails', storage);
var wholedatatable = mongoose.model('wholedatatable', wholedata);

var app = express();

// parse application/x-www-form-urlencoded
app.use(body_parser.urlencoded({ extended: false }))

app.use(express.static('public'));
app.engine('ejs', ejs_mate);
app.set('view engine', 'ejs');



//request method when email has to stored in database
app.post('/', (req, res) => {
    
    var data =  req.body;
    
    var email = new emails({
        user_name: data.emailaddress,
    });



    email.save((error) => {
        if(error){
            console.log("Unable to store data in databse");
        }else{
            console.log("email saved")
            res.send(`${data.emailaddress} is now successfully registered with us.`);
        }
    })
});

app.get('/administrative_circulars', (req, res) => {


    wholedatatable.find({}, (err, founddata) => {
        if(err){
            console.log("Error encountered")
        }
        else{
            res.render("home.ejs",{data : founddata, title: "Administrative Circulars"});
        }
    })

    // var x = new wholedatatable({
    //     heading: 'blah',
    //     subject: 'blah',
    //     date: new Date(),
    //     link: 'blah',
    // })

    // x.save((err) => {
    //     if(err){
    //         console.log(err);
    //     }else{
    //         console.log("-----------------------------------------------------");
    //     }
    // })
    // res.render("home.ejs" );
});

app.get('/coordination', (req, res) => {
    
    
        wholedatatable.find({}, (err, founddata) => {
            if(err){
                console.log("Error encountered")
            }
            else{
                res.render("home.ejs",{data : founddata, title: "Coordination"});
            }
        })
});

app.get('/financial', (req, res) => {
    
    
        wholedatatable.find({}, (err, founddata) => {
            if(err){
                console.log("Error encountered")
            }
            else{
                res.render("home.ejs",{data : founddata, title: "Financial"});
            }
        })
});

app.get('/Llegal', (req, res) => {
    
    
        wholedatatable.find({}, (err, founddata) => {
            if(err){
                console.log("Error encountered")
            }
            else{
                res.render("home.ejs",{data : founddata, title: "Legal"});
            }
        })
});

app.get('/personnel', (req, res) => {
    
    
        wholedatatable.find({}, (err, founddata) => {
            if(err){
                console.log("Error encountered")
            }
            else{
                res.render("home.ejs",{data : founddata, title: "Personnel"});
            }
        })
});



// Listening on port 3000
app.listen(port, ()=>{
    console.log("Server is up on port 3000")
});