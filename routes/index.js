var express = require('express');
var router = express.Router();
var request = require('request');
var MailParser = require("mailparser").MailParser;
var sort = require('../lib/sorting');
var pick = require('../lib/picking');

/* GET home page. */
router.post('/', function(req, res) {
    var mailparser = new MailParser();
    mailparser.on("end", function(mail_object) {
        // see API for https://github.com/andris9/mailparser
        var mail = {
            from: mail_object.from,
            to: mail_object.to,
            cc: mail_object.cc,
            bcc: mail_object.bcc,
            references: mail_object.references,
            inReplyTo: mail_object.inReplyTo,
            priority: mail_object.priority,
            date: mail_object.date,
            attachments: mail_object.attachments,
            headers: mail_object.headers,
            subject: mail_object.subject,
            textBody: mail_object.text,
            htmlBody: mail_object.html
        }
        var result = sort.sorting(mail, pick.picking);

        request.post(
            'http://127.0.0.1:3000/imports/order',
            { result: result },
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    res.writeHead(200, {'content-type': 'text/plain'});
                    res.end();
                }
            }
        );
    });
    mailparser.write(req.param('message'));
    mailparser.end();
});

module.exports = router;
