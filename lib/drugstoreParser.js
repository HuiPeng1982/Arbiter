var S = require('string');

exports.parser = function(mail){
    var content = mail.htmlBody;
    var orderNumber = S(content).between('Order details for order #: ', '</a>').stripTags().collapseWhitespace().s;
    var orderDate = S(content).between('<b>Placed on:</b>', '</td>').stripTags().collapseWhitespace().s;
    var shippingInformation = S(content).between('<b>Shipping to:', '</td>').stripTags().collapseWhitespace().s;
    var itemsList = S(content).between('<strong>Price</strong>', '<br><b>Payment <span id="emailconfmnpayment">').s;
    var items = S(itemsList).stripTags('table', 'tbody', 'tr', 'b', 'p', 'span', 'img').unescapeHTML().s;
    var forItems = items.split(/<\/td>/);
    var list = [];
    var item = {};
    var listIndex = 0;
    var itemIndex = 0;
    for(; listIndex < forItems.length; listIndex++){
        if(!(S(forItems[listIndex]).stripTags('td').isEmpty())){
            var thisItemContent = S(forItems[listIndex]).stripTags('td');
            if(itemIndex === 0){
                item.quantity = thisItemContent.s;
            }else if(itemIndex === 1){
                item.name = thisItemContent.stripTags().collapseWhitespace().s;
                item.url = thisItemContent.between('href="', '"').s;
                item.original_id = S(item.url).between('?pid=','&').s;
                item.img = 'http://pics1.ds-static.com/prodimg/' + item.original_id + '/500.JPG'
            }else if(itemIndex === 2){
                if(thisItemContent.contains('<nobr>')){
                    item.total = thisItemContent.between('','<nobr>').s;
                    item.price = thisItemContent.between('at ','</nobr>').s;
                }else {
                    item.price = thisItemContent.s;
                    item.total = item.price;
                }
            }
            itemIndex++;

            if(itemIndex === 3){
                itemIndex = 0;
                list.push(item);
                item = {};
            }

        }

    }
    var standardShipping, subtotal, tax, orderTotal, applied;
    if(S(content).contains('item total:')){
        standardShipping = S(content).between('<td align="right" nowrap="">standard shipping:</td>', '</tr>').stripTags().collapseWhitespace().s;
        subtotal = S(content).between('<strong> item total:</strong>', '</tr>').stripTags().collapseWhitespace().s;
        tax = S(content).between('<span id="emailconfmntax">tax:</span>', '</tr>').stripTags().collapseWhitespace().s;
        orderTotal = S(content).between('<strong>order total:</strong>', '</tr>').stripTags().collapseWhitespace().s;
        if(S(content).contains('Discount:</strong>')) {
            applied = S(content).between('Discount:</strong>', '</tr>').stripTags().collapseWhitespace().s;
        }
    }else{
        var tem = 'Subtotal' + S(content).between('<span id="emailconfmnsubtotal"> Subtotal</span>','</tbody>').replaceAll('</tr>','|').stripTags().s;
        standardShipping = S(tem).between('Shipping:', '|').collapseWhitespace().s;
        subtotal = S(tem).between('Subtotal:', '|').collapseWhitespace().s;
        tax = S(tem).between('Tax:', '|').collapseWhitespace().s;
        orderTotal = S(tem).between('Total:', '|').collapseWhitespace().s;
        if(S(tem).contains('Discount:')){
            applied = S(tem).between('Discount:', '|').collapseWhitespace().s;
        }
    }
    var billing_info = 'Payment Method' + S(content).between('<span id="emailconfmnpayment">Method</span>', '<table cellpadding="5" cellspacing="0" width="100%" border="0">').replaceAll('</tr>',' ').stripTags().collapseWhitespace().s;

    var result = [];
    result.push({order_id: orderNumber, supplier: 'Drugstore', billing_info: billing_info, state: 1, order_date: orderDate, order_items: list, subtotal: subtotal, shipping_or_handling: standardShipping, tax: tax, order_total:orderTotal, applied: applied, delivery_to: shippingInformation,  email: mail.from});
    return result;
};