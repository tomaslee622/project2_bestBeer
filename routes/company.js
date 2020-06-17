module.exports = (express) => {
    const router = express.Router();

    router.get('/info', (req, res) => {
        if (req.isAuthenticated()) {
            res.render('company_info', { layout: 'loggedin_User'});
        } else {
            res.render('company_info', { layout: 'main' });
        }
    });



    router.get('/promotion', (req, res) => {
        if (req.isAuthenticated()) {
            res.render('company_promotion', { layout: 'loggedin_User'});
        } else {
            res.render('company_promotion', { layout: 'main'});
        }
    });

    return router;
};
