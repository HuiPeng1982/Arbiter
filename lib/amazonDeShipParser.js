var S = require('string');

exports.parser = function(mail){
    var content = mail.htmlBody;
    var orderNumber = S(content).between('Bestellnummer: #', '</a>').stripTags().trim().s;
    var deliveryDate = S(content).between('Lieferung voraussichtlich:','</strong>').stripTags().trim().s;
    var deliveryTracking = S(content).between('Lieferung voraussichtlich:','<img alt="Lieferung verfolgen"').between('href="','"').decodeHTMLEntities().s;
    var result = [];
    result.push({order_id: orderNumber, supplier: 'AmazonDE', state: 2, delivery_tracking: deliveryTracking, delivery_date: deliveryDate, email: mail.from});
    return result;
};