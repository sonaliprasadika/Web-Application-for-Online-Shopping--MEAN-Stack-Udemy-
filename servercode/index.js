var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');

// creating an instance of express
var app = express();

// (import routes.js reference of the route js file (./ means inside folder)
const route = require('./route/routes.js');

// connect mongodb database
mongoose.connect('mongodb://localhost:27017/shoppinglist');

// If connection is successed
mongoose.connection.on('connected', () =>{
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error',(err) =>{
    console.log(err);
});

// assign port
const PORT = 3000;

// middleware
// we use "use" for middleware
// add midleware and allows commnicate between two ports
app.use(cors());

// add midleware and allows work with json dat
app.use(bodyparser.json());

// any route ending with this /api it will be diverted to the routes.js file
app.use('/api', route);

// display this massage on the browser
app.get('/',(req,res) =>{
    res.send("Roger am her dude");
});
// display the massage on the commandline
app.listen(PORT,()=>{
    console.log("Server started at port :" +PORT);
});