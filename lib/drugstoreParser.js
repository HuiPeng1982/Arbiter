var S = require('string');

exports.parser = function(mail){
    var content = mail.htmlBody;
    var orderNumber = S(content).between('Order details for order #: ', '</a>').stripTags().collapseWhitespace().s;
    var orderDate = S(content).between('<b>Placed on:</b>', '</td>').stripTags().collapseWhitespace().s;
    var billingInformation;
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
                item.id = S(item.url).between('?pid=','&').s;
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
    var result = [];
    result.push({orderNumber: orderNumber, orderDate: orderDate, itemsList: list, subtotal: subtotal, shipping: standardShipping, tax: tax, orderTotal:orderTotal, applied: applied, billingInformation: billingInformation, shippingInformation: shippingInformation});
    return result;
};