const express = require('express');
const app = express();
const port = 8000;

//configuring the database
const db = require('./config/mongoose')

//importing the assets folder
app.use(express.static('./assets'));

//importing express-ejs-layout for same layout in each page
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

//these are used so that css file links goes into header after page reload
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//use express router
app.use('/',require('./routes/index'));

//setup view engine
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        console.log(`error in running server : ${err}`);
    }
    console.log(`server is running on port : ${port}`);
})