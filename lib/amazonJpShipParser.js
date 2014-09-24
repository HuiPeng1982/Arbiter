var S = require('string');

exports.parser = function(mail){
    var content = mail.htmlBody;
    var orderNumber = S(content).between('注文番号', '</a>').stripTags().trim().s;
    var deliveryDate = S(content).between('お届け予定日：','</strong>').stripTags().trim().s;
    var deliveryTracking = S(content).between('お届け予定日：','<img alt="配送状況を確認する"').between('href="','"').decodeHTMLEntities().s;
    var result = [];
    result.push({order_id: orderNumber, supplier: 'AmazonJP', state: 2, delivery_tracking: deliveryTracking, delivery_date: deliveryDate, email: mail.from});
    return result;
};