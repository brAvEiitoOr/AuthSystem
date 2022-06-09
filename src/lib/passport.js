const passport = require('passport');
const Strategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.login', new Strategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE usr_user = ?', [username]);
    if (rows.length > 0){
        const user = rows[0];
        const validPass = await helpers.matchPassword(password,user.usr_passw);
        if (validPass){
            done(null, user);
        } else {
            done(null, false);
        }
    }
    else{
        done(null, false);
    }
}));

passport.use('local.register', new Strategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const { id } = req.body;
    const { lname } = req.body;
    const { fname } = req.body;
    const { email } = req.body;
    const { bday } = req.body;

    const newUser = {
        usr_id: id,
        usr_lname: lname,
        usr_fname: fname,
        usr_birthday: bday,
        usr_email: email,
        usr_user: username
    }
    newUser.usr_passw = await helpers.encryptPassword(password);
    const result = await pool.query('INSERT INTO users SET ?', [newUser]);
    return done(null, newUser);
}));

passport.serializeUser((user, done) => {
    done(null, user.usr_id);
});

passport.deserializeUser( async (id, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE usr_id=?', [id]);
    done (null, rows[0]);
});
