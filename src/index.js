const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const passport = require('passport');
const { database } = require('./keys');

const app = express();
require('./lib/passport');

//express settings
app.set('port',8080);
app.set('views', path.join(__dirname, 'views')); //set views folder
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
})); //configure handlebars as view engine
app.set('view engine', '.hbs');

//middlewares
app.use(session({
    secret: 'bravoauthprogram',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}))
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());


//Gloval variables
app.use((req,res,next) => {
    app.locals.user = req.user;
    next();
})

//Routes
app.use(require('./routes'));
app.use(require('./routes/auth'));


//set public folder, where CSS and JS are saved
app.use(express.static(path.join(__dirname, 'public')));

//Start service
app.listen(app.get('port'), () => {
    console.log('Server on port',app.get('port'));
});
