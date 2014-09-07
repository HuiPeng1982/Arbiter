var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var MailParser = require("mailparser").MailParser;

/* GET home page. */
router.get('/', function(req, res) {
    var chunks = [];
    req.on('data', chunks.push.bind(chunks));
    req.on('end', function() {
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
            console.log(mail);
            res.writeHead(200, {'content-type': 'text/plain'});
            res.end();
        });
        var params = querystring.parse(chunks.join("").toString());
        mailparser.write(params['message']);
        mailparser.end();
    });
});

module.exports = router;
