const mongoose = require('mongoose');
const env = require('./environment');

mongoose.connect(`mongodb://localhost/${env.db}`);

const db = mongoose.connection;

db.on('error',console.error.bind(console,'error in conncting to DB'));

db.once('open',function(){
    console.log('connected to database::MOngoDb');
});

module.exports = db;