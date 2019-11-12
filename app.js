// ENV
require('dotenv').config();
// DEPENDENCIES
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var engines = require('consolidate');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

var app = express();

// Set router variables
var indexRouter = require('./routes/index');
var listRouter = require('./routes/lists');

var port = process.env.PORT || 4500;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// View engine setup
app.set('views', __dirname + '/views');
// Use html engine for views
app.engine('html', engines.mustache);
app.set('view engine', 'html');
// app.set('view engine', 'ejs');
// app.engine('html', require('ejs').renderFile);
// Static File Service
app.use(express.static(__dirname + '/public'));
// Body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Node.js의 native Promise 사용
mongoose.Promise = global.Promise;

// CONNECT TO MONGODB SERVER
mongoose.connect(process.env.MONGO_URI, { useMongoClient: true })
  .then(() => console.log('Successfully connected to mongodb'))
  .catch(e => console.error(e));

// ROUTERS
app.use('/', indexRouter);
app.use('/lists', listRouter); // ec2_list dataset
app.listen(port, () => console.log(`Server listening on port ${port}`));
