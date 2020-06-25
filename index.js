var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var path = require('path');
var credentials = require(path.join(__dirname, '/credentials.js'))

const { user, pwd } = credentials.TusovkaDB;
const optionsDB = { user, pass: pwd, useNewUrlParser: true, useUnifiedTopology: true, }


mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/tusovka', optionsDB)
    .then(() => console.log('DB Connected!'))
    .catch(error => handleError(error));
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    if(true){
        var partyList = require('./db/Scheme/party');
        partyList.createOne({
            name: "Руки не жопу",
            organization: "Фанал",
            description: "Не Сосите наш хуй мы это любим",
            stopVerify: "1000000000",
            timeStart: "1235545441",
            rulers: [
                {
                    type: "alcahol",
                    value: -1
                }
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

var app = express();


app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));


app.use(bodyParser.json());

app.use('/images/get/pict', express.static(path.join(__dirname, '/assets')));

var routes = require('./router/partyList');
app.use('/Party', routes);

app.get('/', function (req, res) {

    res.send('Hello World!');
});


// app.use(function (req, res, next) {
//     var err = new Error('File Not Found');
//     err.status = 404;
//     next(err);
// });

// app.use(function (err, req, res, next) {
//     res.status(err.status || 500);
//     res.send(err.message);
// });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});