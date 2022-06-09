// In this file, requests are recieved and then processed.
// res.render renders a page with Handlebars

const express = require('express');
const pool = require('../database');
const router = express.Router();
const passport = require('../lib/passport');

//Route lo load the login and register page
router.get('/', (req,res) =>{
    res.render('pages/login.hbs');
});



router.get('/profile', (req, res) => {
    res.render('pages/profile.hbs');
});

module.exports = router;