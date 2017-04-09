var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var app = express();
var port = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.use(expressLayouts);

//route the app
var router = require('./app/routes');
app.use('/',router);

//static files
app.use(express.static(__dirname + '/public'));

//start server
app.listen(port, function () {
    console.log('app running on port ' + port);
});
