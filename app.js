﻿require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const db = require("./db/conn");
const userModel = require("./db/models/user_model");
const users = require('./mockData/users').profiles;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

global.tokenPool = [];

// let addUser = async (user) => {
//     try {
//         let new_user_model = new userModel({email: user.email, first_name: user.first_name, last_name: user.last_name});
//         let doc = await new_user_model.save(user);
//         return doc;
//     } catch (e) {
//         console.error(e);
//     }
// }

// users.forEach(user => {
//     //let {email, first_name, last_name} = user;
//     console.log(addUser({email: user.email, first_name: user.first_name, last_name: user.last_name}));
// });
// app.use('/users', require('./routes/users/routes'));

// const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3200;
// const server = app.listen(port, function () {
//     console.log('Server listening on port ' + port);
// });