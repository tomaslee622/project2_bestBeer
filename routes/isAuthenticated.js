module.exports = () => {
    // Login checking function
    const checkAuthenticated = (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.redirect('/');
        }
    };

    // Visitor checking function
    const checkNotAuthenticated = (req, res, next) => {
        if (req.isAuthenticated()) {
            return res.redirect('/success');
        }
        return next();
    };
};