var S = require('string');

exports.parser = function(mail){
    var content = mail.htmlBody;
    var orderNumber = S(content).between('Order Details For Order #', '<br>').trim().s;
    var orderDate = S(content).between('Ordered On:','<br>').trim().s;
    var deliveryDate = S(content).between('Shipped On:','</span>').trim().s;
    var deliveryTracking = S(content).between('Track Your Order: ', '</a>').between('href="', '"').s;
    var result = [];
    result.push({order_id: orderNumber, supplier: 'Gymboree', state: 2, delivery_tracking: deliveryTracking, delivery_date: deliveryDate, order_date: orderDate, email: mail.from});
    return result;
};