var express = require('express');
var path = require('path');
var router = express.Router();

module.exports = router;

//route to homepage
router.get('/', function (req, res) {
    res.render('pages/inicio');
});

router.get('/nosotros', function (req, res) {
    res.render('pages/nosotros');
});

router.get('/servicios', function (req, res) {
    res.render('pages/servicios');
});

router.get('/portafolio', function (req, res) {
    res.render('pages/portafolio');
});

//route to another page
router.get('/contacto', function (req, res) {

/*    var helper = require('sendgrid').mail;

    from_email = new helper.Email("test@example.com");
    to_email = new helper.Email("yerma.araya@gmail.com");
    subject = "Sending with SendGrid is Fun";
    content = new helper.Content("text/plain", "and easy to do anywhere, even with Node.js");
    mail = new helper.Mail(from_email, subject, to_email, content);

    var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
    var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()
    });

    sg.API(request, function(error, response) {
        console.log(response.statusCode);
        console.log(response.body);
        console.log(response.headers);
    });*/

    res.render('pages/contacto');

});

//router.post('/contacto');