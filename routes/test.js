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

router.get('/carters-ship', function(req, res) {
    fs.readFile(__dirname + '/../test/fixed/carters-ship.html', function (err, data) {
        if (err) throw err;
        var testMail = {};
        testMail.htmlBody = S(data.toString('utf8', 0, data.length)).replaceAll('\n', '').replaceAll('&nbsp;', '').s;
        testMail.subject = 'Fw:Carters.com | OshKosh.com Shipment Confirmation - Order #CAR08690546';
        sort.sorting(testMail, pick.picking, res);
    });
});

router.get('/gymboree', function(req, res) {
    fs.readFile(__dirname + '/../test/fixed/gymboree.html', function (err, data) {
        if (err) throw err;
        var testMail = {};
        testMail.htmlBody = S(data.toString('utf8', 0, data.length)).replaceAll('\n', '').replaceAll('&nbsp;', '').s;
        testMail.subject = 'Fw:Thank You For Your Gymboree.com Order 50688293!';
        sort.sorting(testMail, pick.picking, res);
    });
});

router.get('/gymboree-ship', function(req, res) {
    fs.readFile(__dirname + '/../test/fixed/gymboree-ship.html', function (err, data) {
        if (err) throw err;
        var testMail = {};
        testMail.htmlBody = S(data.toString('utf8', 0, data.length)).replaceAll('\n', '').replaceAll('&nbsp;', '').s;
        testMail.subject = 'Fw:Your Gymboree Order 50808957 Is On Its Way!';
        sort.sorting(testMail, pick.picking, res);
    });
});

router.get('/amazon', function(req, res) {
    fs.readFile(__dirname + '/../test/fixed/amazon.html', function (err, data) {
        if (err) throw err;
        var testMail = {};
        testMail.htmlBody = S(data.toString('utf8', 0, data.length)).replaceAll('\n', '').replaceAll('&nbsp;', '').s;
        testMail.subject = 'Fw:Your Amazon.com order of "DUPLO LEGO Ville 10525 Big...".';
        sort.sorting(testMail, pick.picking, res);
    });
});

router.get('/amazon-ship', function(req, res) {
    fs.readFile(__dirname + '/../test/fixed/amazon-ship.html', function (err, data) {
        if (err) throw err;
        var testMail = {};
        testMail.htmlBody = S(data.toString('utf8', 0, data.length)).replaceAll('\n', '').replaceAll('&nbsp;', '').s;
        testMail.subject = 'Fw:Your Amazon.com order of "Mini Melissa Melissa..." and 3 more items has shipped!';
        sort.sorting(testMail, pick.picking, res);
    });
});

router.get('/amazonde', function(req, res) {
    fs.readFile(__dirname + '/../test/fixed/amazon.de.html', function (err, data) {
        if (err) throw err;
        var testMail = {};
        testMail.htmlBody = S(data.toString('utf8', 0, data.length)).replaceAll('\n', '').replaceAll('&nbsp;', '').s;
        testMail.subject = 'Fw:Ihre Amazon.de Bestellung von "Aptamil Kindermilch 2 plus...".';
        sort.sorting(testMail, pick.picking, res);
    });
});

router.get('/amazonde-ship', function(req, res) {
    fs.readFile(__dirname + '/../test/fixed/amazon.de-ship.html', function (err, data) {
        if (err) throw err;
        var testMail = {};
        testMail.htmlBody = S(data.toString('utf8', 0, data.length)).replaceAll('\n', '').replaceAll('&nbsp;', '').s;
        testMail.subject = 'FW: Ihre Amazon.de Bestellung von "Aptamil Kindermilch 2 plus..." und 4 andere(r) Artikel wurde versandt!';
        sort.sorting(testMail, pick.picking, res);
    });
});

router.get('/amazonjp', function(req, res) {
    fs.readFile(__dirname + '/../test/fixed/amazon.jp2.html', function (err, data) {
        if (err) throw err;
        var testMail = {};
        testMail.htmlBody = S(data.toString('utf8', 0, data.length)).replaceAll('\n', '').replaceAll('&nbsp;', '').s;
        testMail.subject = 'FW: Amazon.co.jp ご注文の確認 「ロリエ Speed+ スリムガード ...」3点とその他6点';
        sort.sorting(testMail, pick.picking, res);
    });
});

router.get('/amazonjp-ship', function(req, res) {
    fs.readFile(__dirname + '/../test/fixed/amazon.jp-ship.html', function (err, data) {
        if (err) throw err;
        var testMail = {};
        testMail.htmlBody = S(data.toString('utf8', 0, data.length)).replaceAll('\n', '').replaceAll('&nbsp;', '').s;
        testMail.subject = 'Fw:Amazon.co.jp　ご注文の「日清フーズ やわらか杏仁豆腐 60g×6個」2点の発送';
        sort.sorting(testMail, pick.picking, res);
    });
});

router.get('/drugstore', function(req, res) {
    fs.readFile(__dirname + '/../test/fixed/drugstore.html', function (err, data) {
        if (err) throw err;
        var testMail = {};
        testMail.htmlBody = S(data.toString('utf8', 0, data.length)).replaceAll('\n', '').replaceAll('&nbsp;', '').s;
        testMail.subject = 'Fw:Your drugstore.com Order 03343223216100 Confirmation';
        sort.sorting(testMail, pick.picking, res);
    });
});

router.get('/drugstore-ship', function(req, res) {
    fs.readFile(__dirname + '/../test/fixed/drugstore-ship.html', function (err, data) {
        if (err) throw err;
        var testMail = {};
        testMail.htmlBody = S(data.toString('utf8', 0, data.length)).replaceAll('\n', '').replaceAll('&nbsp;', '').s;
        testMail.subject = 'Fw:Shipment Confirmation';
        sort.sorting(testMail, pick.picking, res);
    });
});

//router.get('/victoriassecret', function(req, res) {
//    fs.readFile(__dirname + '/../test/fixed/vs.html', function (err, data) {
//        if (err) throw err;
//        var testMail = {};
//        testMail.htmlBody = S(data.toString('utf8', 0, data.length)).replaceAll('\n', '').replaceAll('&nbsp;', '').s;
//        testMail.subject = "Fw:Victoria's Secret Order Confirmation - Order #567235340";
//        sort.sorting(testMail, pick.picking, res);
//    });
//});

module.exports = router;
