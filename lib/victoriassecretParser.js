var S = require('string');

exports.parser = function(mail) {
    var content = mail.htmlBody;
    var orderNumber = S(content).between('NUMBER<br>', '</a></td>').stripTags().collapseWhitespace().s;

    var itemsList = S(content).between('SUMMARY"></td>', 'Payment Total</td>').s;
    var items = S(itemsList).stripTags('table', 'tbody', 'td', 'tr', 'b', 'p', 'span', 'div', 'img', 'font').unescapeHTML().s;
    var forItems = items.split(/\s{2,}/);

    var result = [];
    result.push({orderNumber: orderNumber});
    return result;
};