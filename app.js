﻿require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/users', require('./routes/users/routes'));

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3200;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});