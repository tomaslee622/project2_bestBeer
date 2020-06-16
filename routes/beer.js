module.exports = (express) => {
    const router = express.Router();

    router.get('/:id', (req, res) => {
        res.render('beer1_detail');
    });

    return router;
};