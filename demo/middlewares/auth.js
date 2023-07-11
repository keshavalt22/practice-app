module.exports = {
    loggedInUser: (req, res, next) => {
        if (req.session && res.session.userId) {
            next()
        } else {
            res.redirect("/users/login");
        }
    }
}