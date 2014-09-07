var express = require('express');
var router = express.Router();
var MailParser = require("mailparser").MailParser;

/* GET home page. */
router.get('/', function(req, res) {
    var mailparser = new MailParser();
    mailparser.on("end", function(mail_object) {
        // TODO: use 'mail_object'
        // see API for https://github.com/andris9/mailparser
        res.render('index', { from: mail_object.from,
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
            htmlBody: mail_object.html });
    });
    mailparser.write(req.query.message);
    mailparser.end();
});

module.exports = router;
