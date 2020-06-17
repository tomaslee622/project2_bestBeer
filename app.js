const express = require('express');
const app = express();
const hb = require('express-handlebars');
const bodyParser = require('body-parser');

app.engine('handlebars', hb({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// end of myCart
app.get('/stats', (req, res) => {
    res.render('stats', { layout: 'loggedin_user' });
});

// Cross origin resource sharing - on your app server
const cors = require('cors');

// env configuration
require('dotenv').config();

// 1. Baisc setup

// Serving the public files
app.use(express.static('public'));

// Body-parser for passport to work
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Setting handlebars as view engine
// app.engine('handlebars', hb({ defaultLayout: 'login_main' }));
// app.set('view engine', 'handlebars');

// 2. Passport authentication setup

// Setup cookie
const setupCookie = require('./utils/init-cookie')(app);

// Local passport setup
const setupLocalPassport = require('./utils/strategies/local-passport');
setupLocalPassport(app);

// Social login setup
const googleSetup = require('./utils/strategies/google-strategy');
const facebookSetup = require('./utils/strategies/facebook-strategy');

// Auehtnication routes
const googleAuth = require('./routes/OAuth/google-auth');
const facebookAuth = require('./routes/OAuth/facebook-auth');
const localRouter = require('./routes/routes')(express);
const userInfo = require('./routes/user/user')(express);
const companyInfo = require('./routes/company')(express);
const checkout = require('./routes/checkout')(express);
const loginOrRegistration = require('./routes/login&register_routes')(express);
const beerInfo = require('./routes/beer/beer')(express);

// Directing to local authentication
app.use('/', localRouter);

// Directing to social login authentication
app.use('/auth/google', googleAuth);
app.use('/auth/facebook', facebookAuth);

// Pages needed to be dynamically rendered
app.use('/user', userInfo);
app.use('/company', companyInfo);
app.use('/checkout', checkout);
app.use('/login', loginOrRegistration);
app.use('/beer', beerInfo);

// Testing the chart.js
app.get('/chart', (req, res) => {
    res.sendFile(__dirname + '/chart.html');
});

const apiRoute = require('./routes/api/apiRoutes')(express);
app.use('/data', apiRoute);

app.listen(3000, () => {
    console.log(`App is listening to port 3000`);
});