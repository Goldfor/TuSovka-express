var path = require('path');

var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');

var nodemailer = require('nodemailer');


var credentials = require(path.join(__dirname, '/credentials.js'))

const { user, pwd } = credentials.TusovkaDB;
const optionsDB = { user, pass: pwd, useNewUrlParser: true, useUnifiedTopology: true, }

mongoose.connect('mongodb://localhost/tusovka', optionsDB)
    .then(() => console.log('DB Connected!'))
    .catch(error => handleError(error));
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    if(false){
        var partyList = require('./db/models/party');
        partyList.createOne({
            name: "Кино 228 537",
            organization: "Фанал",
            description: "Не Сосите наш хуй мы это любим",
            stopVerify: "1000000000",
            timeStart: "1235545441",
            rulers: [
                'movie'
            ],
            photos: [
                {
                    id: 3
                },
                {
                    id: 4
                },
                {
                    id: 5
                },
            ],
            mainPhoto: {
                id: 3
            }
        }, function (error, user) {
            if (error) {
                console.log(error)
            }
            else {}
        })
    }

});

var transporter = nodemailer.createTransport(credentials.Email);

var app = express();

var cors = require('cors')

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(function(req, res, next){
    req.sendEmail = function(to, subject, html){
        transporter.sendMail({
            from: credentials.Email.auth.user,
            to,
            subject,
            html
        }).then(console.log).catch(console.log)
    }
    next();
})


app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));
app.use(passport.initialize());
app.use(passport.session());

var initPassport = require('./db/passport/init');
initPassport(passport);


app.use('/images/get/pict', express.static(path.join(__dirname, '/assets')));

var routesPartyList = require('./router/partyList');
app.use('/Party', routesPartyList);

var routesPassport = require('./router/passport');
app.use('/auth', routesPassport(passport));


app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/app/get/android', function(req, res, next){
    res.download(path.join(__dirname, '/load', '/TuSovka-native.apk'))
})


app.use(function (req, res, next) {
    var err = new Error('File Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});