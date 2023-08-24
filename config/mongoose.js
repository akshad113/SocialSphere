const mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/socialSphere_development');

const db = mongoose.connection;


db.on('error',console.error.bind(console,"Error on connecting to db"));

db.once('open',function(){
    console.log("Successfull connected to the database");
})

module.exports = db;