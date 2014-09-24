var S = require('string');

exports.parser = function(mail){
    var content = mail.htmlBody;
    var orderNumber = S(content).between('Order #', '</a>').stripTags().trim().s;
    var deliveryDate = S(content).between('Your estimated delivery date is:','</strong>').stripTags().trim().s;
    var deliveryTracking = S(content).between('Your estimated delivery date is:','<img alt="Track your package"').between('href="','"').decodeHTMLEntities().s;
    var result = [];
    result.push({order_id: orderNumber, supplier: 'AmazonUS', state: 2, delivery_tracking: deliveryTracking, delivery_date: deliveryDate, email: mail.from});
    return result;
};