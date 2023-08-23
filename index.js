const express = require('express');
const port = 8000;
const Router = require('./routes/index');
const app = express();


app.use('/',Router);

app.listen(port,function(error){
    if(error){
        console.log(`Error while running the expess server ${error}`)
    }
    console.log(`Server is up and running on port ${port}`);
})