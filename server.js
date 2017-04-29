var express = require('express');
var exphbs = require('express-handlebars');
var app = express();
var port = process.env.PORT || 3000;
var path = require('path');

//route the app
var router = require('./app/routes');

//static files
app.use(express.static(__dirname + '/public'));

app.set('views', path.join(__dirname, 'views'));

app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views',
    partialsDir: __dirname + '/views/partials'
}));

app.set('view engine', 'hbs');

app.use('/',router);

//start server
app.listen(port, function () {
    console.log('app running on port ' + port);
});
