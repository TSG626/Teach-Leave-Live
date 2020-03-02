const path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config.js'),
    session = require('express-session'),
    passport = require('passport'),
    cors = require('cors'),
    MongoStore = require('connect-mongo')(session);

module.exports.init = () => {
    //connect to database
    mongoose.connect(config.db.uri, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).then(() => {
        console.log(`Successfully connected to mongoose database.`)
    });

    //initialize app
    const app = express();

    //Cross Origin Resource Sharing
    app.use(cors());

    //enable request logging for development debugging
    app.use(morgan('dev'));

    //body parsing middleware
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());

    //Auth/Session
    app.use(session({
        secret: config.secret,
        resave: true,
        saveUninitialized: true,
        store: new MongoStore({ 
            mongooseConnection: mongoose.connection
        }),
    }));
    //Passport
    app.use(passport.initialize());
    app.use(passport.session());

    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
        res.header(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
      });

    //routing index
    app.use('/api', require('../routes'));

    app.use('/', (req, res) => {
        res.send("404");
    })

    if (process.env.NODE_ENV === 'production') {
        // Serve any static files
        app.use(express.static(path.join(__dirname, '../../client/build')));

        // Handle React routing, return all requests to React app
        app.get('*', function(req, res) {
            res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
        });
    }

    return app
}

