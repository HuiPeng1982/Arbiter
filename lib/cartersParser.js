var S = require('string');
var http = require('http');

exports.parser = function(mail){
    var content = mail.htmlBody;
    var orderNumber = S(content).between('Your order number is', '.').trim().s;
    //var billingInformation = S(content).between('<strong>Billing Information:</strong>', '</td>').stripTags().collapseWhitespace().s;
    var shippingInformation = S(content).between('<strong>Shipping Information:</strong>', '</td>').stripTags().collapseWhitespace().s;
    var itemsList = S(content).between('<td valign="top" style="background-color: #FFFFFF; padding-left: 40px;">', '<td valign="top" style="background-color: #FFFFFF; width: 235px; padding-right: 40px; text-align: right;" align="right">').chompRight('</td>').s;
    var items = S(itemsList).stripTags('table', 'tbody', 'tr', 'td', 'a', 'b', 'p').unescapeHTML().s;
    var forItems = items.split(/\s{2,}/);
    var list = [];
    var item = {};
    var standardShipping, tax, shippingDiscount, orderTotal;
    var listIndex = 0;
    var itemIndex = 0;
    for(; listIndex < forItems.length; listIndex++){
        if(!S(forItems[listIndex]).isEmpty()){
            if(S(forItems[listIndex]).contains('Payment Total:')){
                standardShipping = forItems[listIndex+2];
                tax = forItems[listIndex+4];
                if(listIndex+9 > forItems.length){
                    shippingDiscount = '$0.00';
                    orderTotal = forItems[listIndex+6];
                }else {
                    shippingDiscount = forItems[listIndex+6];
                    orderTotal = forItems[listIndex+8];
                }
                break;
            }

            if(itemIndex === 0){
                item.name = forItems[listIndex];
                item.url = 'http://www.carters.com/on/demandware.store/Sites-Carters-Site/default/Search-Show?q=' + S(item.name).replaceAll(' ', '+').s;
            }else if(itemIndex === 1){
                item.quantity = forItems[listIndex];
            }else if(itemIndex === 2){
                item.price = forItems[listIndex];
            }else if(itemIndex === 3){
                item.total = forItems[listIndex];
            }else if(itemIndex === 4){
                if(S(forItems[listIndex]).contains('Coupons / promotions applied:')){

                }else{
                    item.brand = S(forItems[listIndex]).between('alt="', '"').s;
                    item.brandImg = S(forItems[listIndex]).between('src="', '"').s;
                    itemIndex = 6;
                }
            }else if(itemIndex === 5){
                item.applied = forItems[listIndex];
            }else if(itemIndex === 6){
                item.brand = S(forItems[listIndex]).between('alt="', '"').s;
                //item.brandImg = S(forItems[listIndex]).between('src="', '"').s;
            }else if(itemIndex === 7){
                if(S(forItems[listIndex]).between('src="', '"').contains('_Default.') && !(S(forItems[listIndex]).between('src="', '"').contains('hi-res/style_'))) {
                    item.img = S(forItems[listIndex]).between('src="', '"').s;
                    item.original_id = 'V_' + S(item.img).between('hi-res/', '_').s;
                    if(S(item.brand).contains("Carter's")) {
                        item.url = 'http://www.carters.com/' + item.original_id + '.html';
                    }else if(S(item.brand).contains("OshKoshB'gosh")) {
                        item.url = 'http://www.oshkosh.com/' + item.original_id + '.html';
                    }
                }else if(S(forItems[listIndex]).between('src="', '"').contains('hi-res/style_')){
                    item.url = S(content).between(item.name, S(forItems[listIndex]).between('src="', '"').s).between('height:75px;" href="','"').s;
                }else {
                    item.img = S(forItems[listIndex]).between('src="', '"').s;
                    item.original_id = 'VC_' + S(item.img).between('hi-res/', '_').s;
                    if(S(item.brand).contains("Carter's")) {
                        item.url = 'http://www.carters.com/' + item.original_id + '.html';
                    }else if(S(item.brand).contains("OshKoshB'gosh")) {
                        item.url = 'http://www.oshkosh.com/' + item.original_id + '.html';
                    }
                }
            }else if(itemIndex === 8){
                item.color = S(forItems[listIndex]).chompLeft('Color: ').s;
            }else if(itemIndex === 9){
                item.size = S(forItems[listIndex]).chompLeft('Size: ').s;
            }
            itemIndex++;

            if(itemIndex === 10){
                itemIndex = 0;
                list.push(item);
                item = {};
            }
        }
    }
    var billing_info = S(content).between('Payment Total:', 'Billing Information:').stripTags().collapseWhitespace().unescapeHTML().s;

    var result = [];
    result.push({order_id: orderNumber, supplier: 'Carter', billing_info: billing_info, state: 1, order_items: list, shipping_or_handling: standardShipping, tax: tax, order_total:orderTotal, delivery_to: shippingInformation,  email: mail.from});
    return result;
};