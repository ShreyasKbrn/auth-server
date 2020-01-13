const express = require('express');
const router = express.Router();
const userService = require('./service');
const tokenFunctions = require('../../helpers/tokenFunctions');
/*
    Authenticate user,
    create user
*/
let authenticate = (req, res, next) => {
    let response = userService.validateUserCredentials(req.body);
    if (response.status === 1) {
        res.json({status: 1, token: tokenFunctions.generateToken(req.body)});
    } else {
        res.json({status: -1});
    }
}

let getAll = (req, res, next) => {
    res.json(userService.getAllUsers());
}

let addUser = (req, res, next) => {
    let response = userService.addUser({
        email: req.body.email,
        first_name: req.body.email,
        last_name: req.body.email,
    });

    if (response.status === -1) {
        res.json({status: -1, message: 'user already exists.'});
    } else if(response.status === 1) {
        res.json({status: 1});
    }
}

router.post('/authenticate', authenticate);
router.get('/getAll', getAll);
router.post('/addUser', addUser);

module.exports = router;
