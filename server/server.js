const express = require('express');
const cors = require('cors');
// if your project needs to talk to other servers/websites that exist away from this project server cors can reach out to it
const moragn = require('morgan');
const apiRouter = require('./routes');
// default looks for the index

let app = express();
app.use(moragn("dev"));
app.use(express.static("client"));
// default looks for the index inside of "client folder " 

app.use(cors());
app.use(express.json());

app.use('/api', apiRouter);

app.listen(3000, (console.log(`started ${new Date().toLocaleTimeString()}`)))