const express = require('express');
const app = express();
const hb = require('express-handlebars');
const bodyParser = require('body-parser');

app.engine('handlebars', hb({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.render('homepage');
  // if (loggedin() == true){
  //   res.render('homepage', { defaultLayout: 'loggedin_User' });
  // }
  // else {

  // }

  // , {layout: 'alternate'}, add this as the second argument to res.render
});

// end of navbar section


app.get('/company_info',(req, res) => {
  res.render('company_info');
});
app.get('/company_promotion', (req, res) => {
  res.render('company_promotion');
});
// end of btn_group(co_info & promotion)
app.get('/menu_page', (req, res) => {
  res.render('menu_page');
});

app.get('/beer1_detail', (req, res) => {
  res.render('beer1_detail');
});
app.get('/beer2_detail', (req, res) => {
  res.render('beer2_detail');
});
app.get('/beer3_detail', (req, res) => {
  res.render('beer3_detail');
});
// end of beers detail
app.get('/loggedin_User', (req, res) => {
  res.render('loggedin_User');
});

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

// From Jacky's app.js
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

// Google Strategy setup
const googleSetup = require('./utils/strategies/google-strategy');

// Facebook Strategy setup
const facebookSetup = require('./utils/strategies/facebook-strategy');

// Auehtnication routes
const localRouter = require('./routes/routes')(express);
const googleAuth = require('./routes/OAuth/google-auth');
const facebookAuth = require('./routes/OAuth/facebook-auth');

// Directing to local authentication
app.use('/', localRouter);

// Directing to Google authentication
app.use('/auth', googleAuth);

// Directing to Facebook authentication
app.use('/auth', facebookAuth);

// Testing the chart.js
app.get('/chart', (req, res) => {
  res.sendFile(__dirname + '/chart.html');
});

const apiRoute = require('./routes/api/apiRoutes')(express);
app.use('/data', apiRoute);

app.listen(process.env.PORT);
console.log('application listening to port ' + process.env.PORT);

app.listen(8080, () => {
  console.log(`App is listening to port 8080`);
});
