var express = require('express');
var path = require('path');
var router = express.Router();

module.exports = router;

//route to homepage
router.get('/', function (req, res) {
    res.render('pages/index');
});

//route to another page
router.get('/contacto', function (req, res) {
    res.send('This is the contact page');
});

router.post('/contacto');