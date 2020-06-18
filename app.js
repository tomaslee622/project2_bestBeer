const express = require('express');
const app = express();
const hb = require('express-handlebars');
const bodyParser = require('body-parser');

app.engine('handlebars', hb({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/homepage_login', (req, res) => {
    res.render('homepage_login');
});

app.get('/homepage', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('homepage', { layout: 'loggedin_User' });
    } else {
        res.redirect('homepage', { layout: 'main' });
    }
});

app.get('/stats', (req, res) => {
    res.render('stats', { layout: 'loggedin_User', stats: 'homepage_login' });
});

app.get('/menu_page_loggin', (req, res) => {
    res.render('menu_page_loggin', { layout: 'loggedin_User' });
});
app.get('/menu_page', (req, res) => {
    res.render('menu_page');
});
//   end of menu page

app.get('/login_begin', (req, res) => {
    res.render('login_begin', { layout: 'main' });
});
app.get('/login_input', (req, res) => {
    res.render('login_input', { layout: 'main' });
});
// login_ begin & input >> using layout page_header_view

app.get('/user_regist_registered', (req, res) => {
    res.render('user_regist_registered', { layout: 'loggedin_user' });
});
app.get('/user_account-details', (req, res) => {
    res.render('user_account-details', { layout: 'loggedin_user' });
});
app.get('/user_comment_history', (req, res) => {
    res.render('user_comment_history', { layout: 'loggedin_user' });
});
app.get('/user_discount_code', (req, res) => {
    res.render('user_discount_code', { layout: 'loggedin_user' });
});
app.get('/user_purchase_history', (req, res) => {
    res.render('user_purchase_history', { layout: 'loggedin_user' });
});
app.get('/user_wishlist', (req, res) => {
    res.render('user_wishlist', { layout: 'loggedin_user' });
});
// end of users page

app.get('/myCart_showList', (req, res) => {
    res.render('myCart_showList', { layout: 'loggedin_user' });
});
app.get('/myCart_Delivery', (req, res) => {
    res.render('myCart_Delivery', { layout: 'loggedin_user' });
});
app.get('/myCart_payment', (req, res) => {
    res.render('myCart_payment', { layout: 'loggedin_user' });
});
app.get('/myCart_payCompleted', (req, res) => {
    res.render('myCart_payCompleted', { layout: 'loggedin_user' });
});

// end of myCart
app.get('/stats', (req, res) => {
    res.render('stats', { layout: 'loggedin_user' });
});
app.get('/user_registration', (req, res) => {
    res.render('user_registration');
});
app.get('/login_input', (req, res) => {
    res.render('login_input');
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

// Setup cookie and passport
const setupCookie = require('./utils/init-cookie')(app);

// Local passport setup
const setupLocalPassport = require('./utils/strategies/local-passport');
setupLocalPassport();

// Social login setup
const googleSetup = require('./utils/strategies/google-strategy');
const facebookSetup = require('./utils/strategies/facebook-strategy');

// Auehtnication routes
const googleAuth = require('./routes/OAuth/google-auth');
const facebookAuth = require('./routes/OAuth/facebook-auth');
// other
const localRouter = require('./routes/routes')(express);
const userInfo = require('./routes/user/user')(express);
const companyInfo = require('./routes/company')(express);
const checkout = require('./routes/checkout/checkout')(express);
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

// Testing the database
// const knexConfig = require('./knexfile')['development'];
// const knex = require('knex')(knexConfig);

// let query = knex('reviews').select();
// query.then((data) => {
//     console.log(data);
// });

app.listen(3000, () => {
    console.log(`App is listening to port 3000`);
});