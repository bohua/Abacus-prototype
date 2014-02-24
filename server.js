
/**
 * Module dependencies.
 */

var express = require('express');
var util = require('./routes/utils');
var http = require('http');
var path = require('path');
var db = require('./models');
var cusomter = require('./routes/customer');

var app = express();

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', util.loadJsScript);
app.get('/getLeftMenu', util.getLeftMenu);
app.get('/getLocationArray', util.getLocationArray);
app.get('/customer/:customer_id',cusomter.getCustomer );

db
	.sequelize
	.sync({ force: true })
	.complete(function(err) {
		if (err) {
			throw err;
		} else {
			http.createServer(app).listen(app.get('port'), function(){
				console.log('Express server listening on port ' + app.get('port'));
			})
		}
	});