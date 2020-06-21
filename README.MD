# bestBeer

![bestBeer](https://github.com/tomaslee622/project2_bestBeer/blob/master/public/asset/logo.png?raw=true)

`bestBeer` is a fully functional shopping cart built in Node.js (Express, SQL) with buile in a useful payment providers.

Payment providers included:

- [Stripe](https://stripe.com/)

```
Demo User:
- User: `test@test.com`
- Password: `test`
```

## Installation

1. Create a folder to hold your installation: `mkdir project2_bestBeer`
2. FTP/Copy the contents of the zip to your newly created folder
3. Enter folder: `cd project2_bestBeer`
4. Install dependencies: `npm install`
5. Create file: `.env` and input

```
(example)
GOOGLE_CLIENT_ID=935755710417-6op4te8uoa5u563rgetv5rk72465pbuh.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xORIR3m8nf_qfEzGVP4KTPSE
FB_APP_SECRET=6d2add1a6dd86dd6b16e558edd19705f
FB_APP_ID=343538859963113
PORT=3000
DB_IP=13.229.246.129
DB_USER=postgres
DB_PW=postgres
```

6. Start application: `nodemon app.js`
7. Visit [www.bestbeer79.com:3000](www.bestbeer79.com:3000) in your browser

#### Demo images

Homepage:
![Homepage](https://github.com/tomaslee622/project2_bestBeer/blob/master/public/asset/homepage.png?raw=true)

User manage settings:
![User](https://github.com/tomaslee622/project2_bestBeer/blob/master/public/asset/user_page.png?raw=true)

Product list:
![product_list](https://github.com/tomaslee622/project2_bestBeer/blob/master/public/asset/product_list.png?raw=true)

##### Styling:

Bootstrap is used heavily within the HTML pages for styling.

Further styling can be done through adding one's own custom CSS into the `CSS` folder which is `main.css`. This will be minified and added to each page.

##### Views: Layouts

There are three layouts, depending on the profile of the user:
`employee.handlebars` is for company staff.
`main.handlebars` is for customers who have not logged in.
`loggedin_User.handlebars` is for customers who have logged in. Logged-in users have access to more functions than those who are not logged in.

To make all these work

##### Views: Header

The page header contains the company logo and various navigation links, and is situated in the `partials` folder of `page_footer.handlebars`.

There are two header layouts ; one for customers who are logged in and one for customers who are not logged in. One of these two layouts will be added to the top of every page.

##### Views: Footer

You can add your own custom HTML coded footer which may have contact details, social media links etc into the `partials` folder of `page_footer.handlebars`. This will be added to the bottom of every page.

##### Functionality

Customers who are not logged in should be able to:

Access the 'Home', 'About', 'Beer Detail', 'Promotion' 'Menu' and 'Login' pages through the Header.

Submit a message anonymously to the Company through the Footer.

Customers who are logged in should additionally be able to:

Access the 'Shopping Cart' and 'Account Details' sections through the Header (also log-out).

Click buttons which permit the user to 'Comment' , 'Like' and 'Buy' products when viewed.

Company staff should be able to:

Access the statistics page, which displays stock levels, sales data and user data.

### Products

The company currently serves three products, all of which are beers.

Additional products can be added through the back-end, which is currently set up only to handle details of additional beers.

### User Accounts

When a user registers a new account through the 'login' page, the following data can be submitted to the back-end:

<ul>
<li>
First Name</li><li>
Last Name</li><li>
Email (acts as a username)</li><li>
Telephone</li><li>
Address</li>
</ul>

After all there will have a notification telling the registration is successful.

###User Login

bestBeer is using `passport.js` to login as a normol user. <br>As for FB / Google login, we set up files for authentication. <br>To do > set up folder `routes` > folder for authentication , here we called `OAuth` >
inside we created two file (one for FB, one for Google) called `facbook-auth.js`.

An example of both files is provided :

```
{
    // Redirect to Faceboook login page
router.get('/', passport.authenticate('facebook'));

router.get(
    '/redirect',
    passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/error',
    })
);

module.exports = router;
}
```

Note: Do not forget to do: `npm install --save passport`

## Stripe (Payments)

An example Stripe settings file is provided:

```
{
const session = await stripe.checkout.sessions.create({
                    success_url: 'http://localhost:3000/checkout/payment_completed',
                    cancel_url: 'http://localhost:3000/checkout/showlist',
                    payment_method_types: ['card'],
                    customer_email: req.user.email,
                    line_items: [{
                        name: 'Beers',
                        description: 'A local craft beer website, by the way, is the picture creepy? Or does it look like a scam.',
                        currency: 'usd',
                        amount: totalAmount * 100,
                        quantity: 1,
                        images: ['https://i.imgur.com/sUjnVxw.jpg'],
                    }, ],
                    mode: 'payment',
                });
}
```

Note: the output will look like this. 
![stripe display](https://github.com/tomaslee622/project2_bestBeer/blob/master/public/asset/stripe.png?raw=true)

### Built With

<ul>
<li>Bootstrap: A front-end component library</li>
<li>Jquery: Back-end component library</li>
<li>Animate.css: front-end animations</li>
<li>Font Awesome icon: For some amazing icons</li>
<li>coolors.co: For color picker</li>
<li>Adobe: For pictures, logo editing</li>
<li>Node.js</li>
<li>Postgres</li>
</ul>
