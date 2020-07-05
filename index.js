const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;

//configuring the database
const db = require('./config/mongoose')

//middleware for form parser
app.use(express.urlencoded());
//middleware for cookie parser install cookie-parser for this
app.use(cookieParser());

//importing the assets folder----above than ./routes file
app.use(express.static('./assets'));

//importing express-ejs-layout for same layout in each page install express-ejs-layouts for this
const expressLayouts = require('express-ejs-layouts');
const { urlencoded } = require('express');
app.use(expressLayouts);

//these are used so that css file links goes into header after page reload
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//use express router-----below assets
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