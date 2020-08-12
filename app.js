var express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');
var agentRouter = require('./routes/agent');
var adminRouter = require('./routes/admin');
var webmasterRouter = require('./routes/webmaster');
var clientRouter = require('./routes/client');
var linkRouter = require('./routes/link');
var session = require('express-session');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'el nido palawan',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/agent', agentRouter);
app.use('/admin', adminRouter);
app.use('/webmaster', webmasterRouter);
app.use('/client', clientRouter);
app.use('/link', linkRouter);

module.exports = app;
