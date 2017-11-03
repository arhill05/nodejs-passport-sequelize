module.exports.signUp = (req, res) => {
    res.render('signup');
}

module.exports.signIn = (req, res) => {
    res.render('signIn');
}

module.exports.dashboard = (req, res) => {
    res.render('dashboard');
}

module.exports.logout = (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/');
    });
}