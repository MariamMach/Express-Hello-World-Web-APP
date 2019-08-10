const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // res.send('<h1>Hello World Boom Splash!</h1>');
    const name = req.cookies.username;
    if (name) {
        res.render('index', { name });
    } else {
        res.redirect('/hello');
    }
});


router.get('/hello', (req, res) => {
    const name = req.cookies.username;
    if (name) {
        res.redirect('/');
    } else {
        res.render('hello');
    }
});

router.post('/hello', (req, res) => {
    console.dir(req.body);
    res.cookie('username', req.body.username);
    res.redirect('/');
});

router.post('/goodbye', (req, res) => {
    res.clearCookie('username');
    res.redirect('/hello');
});

module.exports = router;