var S = require('string');

exports.parser = function(mail){
    var content = mail.htmlBody;
    var orderNumber = S(content).between('details for order #:', '</a>').stripTags().collapseWhitespace().s;
    var deliveryTracking = S(content).between('Delivery/Tracking:', '</a>').between('href="', '"').s;
    var result = [];
    result.push({order_id: orderNumber, supplier: 'Drugstore', state: 2, delivery_tracking: deliveryTracking, email: mail.from});
    return result;
};