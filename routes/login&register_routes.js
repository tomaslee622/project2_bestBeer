module.exports = (express) => {
    const router = express.Router();

    // The login page that allows user either login or register
    router.get('/login_begin', (req, res) => {
        res.render('login_begin', { layout: 'main' });
    });

    // Users can opt for social login or local login
    router.get('/login_input', (req, res) => {
        res.render('login_input', { layout: 'main' });
    });

    router.get('/user_registration', (req, res) => {
        res.render('user_registration', { layout: 'loggedin_user' });
    });
};