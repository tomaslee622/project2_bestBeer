module.exports = (express) => {
    const router = express.Router();

    router.get('/info', (req, res) => {
        res.render('company_info');
    });
    router.get('/promotion', (req, res) => {
        res.render('company_promotion');
    });

    return router;
};