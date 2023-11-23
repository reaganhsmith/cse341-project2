const express = require('express');
const mongodb = require('./data/database');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const passport = require('passport');
const session = require('express-session');
const gitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

app.use(bodyParser.json());
app.use(session({
    secret: "session",
    resave: false,
    saveUnintialized: true,
}))
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Orgin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers', 
        'Orgin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});
app.use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}));
app.use(cors({origin: '*'}));

app.use('/', require('./routes'));


process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
  });

passport.use(new gitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done){
    return done(null, profile);
}
));


passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
}
);

app.get('/', (req, res) => {
    res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}`: "Logged Out")
});

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session:false}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    }
)

mongodb.initDb((err) => {
    if(err){
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Database is listening and running on port ${port}!`)
        });
    }
})


