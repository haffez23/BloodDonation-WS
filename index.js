//dependencies
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const dbDebugger = require('debug')('app:db');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const multer = require('multer');
var cors = require('cors');

//routes
require('./routes')(app);



global.__basedir = __dirname;

require('./app/uploadfile/upload.multipartfile.js')(app);



if(app.get('env') === 'development')
{
  app.use(morgan('tiny'));
  console.log("Morgan enable ...");

}
app.use(express.json());
app.use(express.static('public'));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

function test() {
  console.log('called');
}
var interval = setInterval(test, 10000);

// app.use('/', express.static(__dirname + '/public'));
// require('./controller/upload.multipartfile.js')(app);


var port     = process.env.PORT || 8000;

var listen = app.listen(port);
console.log('The App runs on port ' + port);

