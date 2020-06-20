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
7. Visit [localhost: 3000](localhost:3000) in your browser

#### Demo images

Homepage:
<!-- ![Homepage]() -->

Admin manage settings:
<!-- ![Admin manage settings]() -->

Popout cart:
<!-- ![Popout cart]() -->

Dashboard:
<!-- ![Dashboard])() -->

##### CSS

You can add your own custom CSS into the `CSS` folder which is `main.css`. This will be minified and added to each page.

##### Footer

You can add your own custom HTML coded footer which may have contact details, social media links etc into the `partials` folder of `page_footer.handlebars`. This will be added to bottom of each page.

### Products

Adding of new products is done via .

