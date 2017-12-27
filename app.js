const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const config = require('./config/config');
const cors = require('cors');

let routes = require('./routes');
let app = express();

app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({credentials: true, origin: true}));

routes(app);
let log = require('./utils/logHelper');
log.use(app);
app.set('superSecret', config.secretKey); // token secretKey

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     let err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// error handler
// app.use(function(err, req, res) {
//     res.status(err.status || 500);
//     res.send({
//         'code': 500,
//         'msg': err.message
//     });
// });

module.exports = app;