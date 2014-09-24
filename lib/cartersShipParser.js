var S = require('string');

exports.parser = function(mail){
    var content = mail.htmlBody;
    var orderNumber = S(content).between('Your order #', ' has shipped.').s;
    var deliveryTracking = 'http://wwwapps.ups.com/WebTracking/track?track=yes&trackNums=' + S(content).between('<span style="font-family: Arial,Helvetica,sans-serif; font-size:12px; color:#8a9ba6;">', '</span>').stripTags().collapseWhitespace().s;
    var result = [];
    result.push({order_id: orderNumber, supplier: 'Carter', state: 2, delivery_tracking: deliveryTracking, email: mail.from});
    return result;
};