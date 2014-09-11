var express = require('express');
var router = express.Router();
var S = require('string');
var fs = require('fs');
var sort = require('../lib/sorting');
var pick = require('../lib/picking');

/* GET home page. */
router.get('/carters', function(req, res) {
    fs.readFile(__dirname + '/../test/fixed/carters2.html', function (err, data) {
        if (err) throw err;
        var testMail = {};
        testMail.htmlBody = S(data.toString('utf8', 0, data.length)).replaceAll('\n', '').replaceAll('&nbsp;', '').s;
        testMail.subject = 'Fw:Your Order #CAR08690546 with Carters.com | OshKosh.com';
        sort.sorting(testMail, pick.picking, res);
    });
});

router.get('/gymboree', function(req, res) {
    fs.readFile(__dirname + '/../test/fixed/gymboree2.html', function (err, data) {
        if (err) throw err;
        var testMail = {};
        testMail.htmlBody = S(data.toString('utf8', 0, data.length)).replaceAll('\n', '').replaceAll('&nbsp;', '').s;
        testMail.subject = 'Fw:Thank You For Your Gymboree.com Order 50688293!';
        sort.sorting(testMail, pick.picking, res);
    });
});

router.get('/amazon', function(req, res) {
    fs.readFile(__dirname + '/../test/fixed/amazon-s.html', function (err, data) {
        if (err) throw err;
        var testMail = {};
        testMail.htmlBody = S(data.toString('utf8', 0, data.length)).replaceAll('\n', '').replaceAll('&nbsp;', '').s;
        testMail.subject = 'Fw:Your Amazon.com order of "DUPLO LEGO Ville 10525 Big...".';
        sort.sorting(testMail, pick.picking, res);
    });
});

module.exports = router;