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




/*var pages = Array.from(document.querySelectorAll('.pages .page'));
console.log(pages);
revealerOpts = {
    nmbLayers : 3,
    bgcolor : ['#93C13E', '#fff', '#3E3A35'],
    effect : 'anim--effect-4',
    onStart : function(direction) {
        var nextPage = pages[currentPage === 0 ? 1 : currentPage];
        classie.add(nextPage, 'page--animate-right');
    },
    onEnd : function(direction) {
        var nextPage = pages[currentPage === 0 ? pages.length -1 : 0];
        nextPage.className = 'page'
    }
};
revealer = new Revealer(revealerOpts);

// clicking the page nav buttons
var navBtns = Array.from(document.querySelectorAll('nav a'));
navBtns.forEach(function (btn) {
    btn.addEventListener('click', function() {
        reveal('right');
    });
});


function reveal(direction) {
    var callbackTime = 500,
        callbackFn = function() {
            classie.remove(pages[currentPage], 'page--current');
            currentPage = currentPage < pages.length -1 ? currentPage + 1 : 0;
            classie.add(pages[currentPage], 'page--current');
        };

    revealer.reveal(direction, callbackTime, callbackFn);
}*/




//router.post('/contacto');