// In this file, requests are recieved and then processed.
// res.render renders a page with Handlebars

const express = require('express');
const pool = require('../database');
const router = express.Router();
const passport = require('../lib/passport');
const helpers = require('../lib/helpers');

//Route lo load the login and register page
router.get('/', (req,res) =>{
    res.render('pages/login.hbs');
});



router.get('/profile', async (req, res) => {
    const users = await pool.query('SELECT * FROM users');
    const loginLog = await pool.query('SELECT * FROM login_log');
    const regLog = await pool.query('SELECT * FROM reg_log');
    users.forEach((element) => {
        element.usr_birthday = helpers.datetimeToDate(element.usr_birthday);
    })
    console.log(users[0].usr_birthday);
    res.render('pages/profile.hbs',{
        users,
        loginLog,
        regLog
    });
});

module.exports = router;