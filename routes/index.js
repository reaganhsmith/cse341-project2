const passport = require('passport');
const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World.']
    res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.username}`: "Logged Out")
});

router.use('/pokemon', require('./pokemon'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next){
    req.logout(function(err){
        if(err){
            return next(err);
        }
        res.redirect('/')
    });
});


module.exports = router;