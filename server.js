const express = require('express');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const env = require('dotenv').load();
const exphbs = require('express-handlebars');

const app = express();



app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({secret: 'keyboard cat', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.set('views', './app/views');
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

const models = require('./app/models');
const authRoute = require('./app/routes/auth.js')(app, passport);
require('./config/passport/passport.js')(passport, models.user);

models.sequelize.sync().then(() => {
    console.log('Database looks fine');
}).catch((err) => {
    console.error(err, 'Something went wrong with the DB update!');
})



app.get('/', (req, res) => {
    res.send('Welcome to Passport with Sequelize');
});

app.listen(5000, (err) => {
    if(!err)
    console.log('Site is live');
    else console.error(err);
})