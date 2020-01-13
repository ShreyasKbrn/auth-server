const express = require('express');
const router = express.Router();
const userService = require('./service');
/*
    Authenticate user,
    create user
*/

let authenticate = (req, res, next) => {
    let response = userService.validateUserCredentials(req.body);
    res.json(response);
}

let getAll = (req, res, next) => {
    res.json(userService.getAllUsers());
}

router.post('/authenticate', authenticate);
router.get('/getAll', getAll);

module.exports = router;
