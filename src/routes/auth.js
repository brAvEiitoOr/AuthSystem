const express = require('express');
const { ResultWithContext } = require('express-validator/src/chain');
const router = express.Router();
const passport = require('passport');

    //res.send('<pre>'+req.body+'</pre>');
    // await pool.query('INSERT INTO users VALUES (?)', [Object.values(req.body)]);
    // console.log(req.body);
    // res.redirect('/');

router.post('/login', (req,res,next) => {
    passport.authenticate('local.login', {
        successRedirect: '/profile',
        failureRedirect: '/'
    })(req,res,next);
});

router.post('/register', passport.authenticate('local.register', {
        successRedirect: '/profile',
        failureRedirect: '/'
}));

module.exports = router;