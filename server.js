const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//database connection string path
const dbConfig = require('./config/dbconfig.js');

//establishing connection to database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

//sample route
app.get('/', (req, res) => { res.send("Welcome to NodeJsTask-3") });

//path for routes 
require('./app/routes/routes')(app);

app.listen(8080, () => { console.log('app is listning on port 8080') });