var S = require('string');

exports.parser = function(mail){
    var content = mail.htmlBody;
    if(S(content).contains('Your purchase has been divided into 2 orders.')) {
        var splitContentArr = content.split('<td style="vertical-align: top; font-size: 13px; line-height: 18px; font-family: Arial, sans-serif"> Order #');
        var index = 1;
        var result = [];
        for(;index<splitContentArr.length;index++){
            result.push(amazonParser('<td style="vertical-align: top; font-size: 13px; line-height: 18px; font-family: Arial, sans-serif"> Order #' + splitContentArr[index], '<table style="width: 95%; border-collapse: collapse" id="itemDetails">', 'Item Subtotal:'));
        }
        return result;
    }else{
        var result = [];
        result.push(amazonParser(content, '<td style="padding-left: 32px; vertical-align: top; font-size: 13px; line-height: 18px; font-family: Arial, sans-serif">', ' Item Subtotal: '));
        return result;
    }
};

var amazonParser = function(content, itemsBefore, itemsAfter){
    var orderNumber = S(content).between('<td style="vertical-align: top; font-size: 13px; line-height: 18px; font-family: Arial, sans-serif"> Order #', '</a>').stripTags().trim().s;
    var orderDate = S(content).between('<span style="font-size: 12px; color: rgb(102, 102, 102)">Placed on ', '</span>').trim().s;
    var billingInformation;
    var shippingInformation = S(content).between('Your order will be sent to:', '</b>').replaceAll('<br>', ' ').stripTags().collapseWhitespace().s;
    var itemsList = S(content).between(itemsBefore, itemsAfter).s;
    var items = S(itemsList).stripTags('table', 'tbody', 'span', 'div', 'strong', 'tr', 'td', 'b', 'p').replaceAll('111', '').unescapeHTML().s;
    var forItems = items.split(/\s{2,}/);
    var list = [];
    var item = {};
    var listIndex = 0;
    var itemIndex = 0;
    for (; listIndex < forItems.length; listIndex++) {
        if (!S(forItems[listIndex]).isEmpty()
            && !(S(forItems[listIndex]).contains('http://g-ecx.images-amazon.com/images/G/01/x-locale/personalization/live-meter/facebook.'))
            && !(S(forItems[listIndex]).contains('http://g-ecx.images-amazon.com/images/G/01/x-locale/communities/social/twitter'))
            && !(S(forItems[listIndex]).contains('http://g-ecx.images-amazon.com/images/G/01/x-locale/communities/social/pinterest'))) {
            //console.log(forItems[listIndex]);
            //console.log('itemIndex:------->' + itemIndex);
            if (itemIndex === 0) {
                item.productUrl = S(forItems[listIndex]).between('href="', '"').s;
                item.img = S(forItems[listIndex]).between('src="', '"').replaceAll('_SCLZZZZZZZ__SY115_SX115_.', '').s;
            } else if (itemIndex === 1) {
                item.product = S(forItems[listIndex]).stripTags().trim().s;
            } else if (itemIndex === 2) {
                if (!(S(forItems[listIndex]).contains('Sold by'))) {
                    item.productType = S(forItems[listIndex]).trim().s;
                } else {
                    item.soldBy = S(forItems[listIndex]).stripTags().chompLeft('Sold by ').trim().s;
                    if (!S(item.soldBy).contains('Amazon.com LLC')) {
                        item.soldByUrl = S(forItems[listIndex]).between('href="', '"').trim().s;
                    }
                    itemIndex++;
                }
            } else if (itemIndex === 3) {
                item.soldBy = S(forItems[listIndex]).stripTags().chompLeft('Sold by ').trim().s;
                if (!S(item.soldBy).contains('Amazon.com LLC')) {
                    item.soldByUrl = S(forItems[listIndex]).between('href="', '"').trim().s;
                }
            } else if (itemIndex === 4) {
                if (!(S(forItems[listIndex]).contains('Condition:'))) {
                    item.total = forItems[listIndex];
                    itemIndex++;
                } else {
                    item.condition = S(forItems[listIndex]).chompLeft('Condition: ').s;
                }
            } else if (itemIndex === 5) {
                item.total = forItems[listIndex];
            }

            itemIndex++;

            if (itemIndex === 6) {
                itemIndex = 0;
                list.push(item);
                item = {};
            }
        }

    }
    var subtotal, applied, standardShipping, orderTotal;
    subtotal = S(content).between('Item Subtotal: </td>', '</td>').stripTags().collapseWhitespace().s;
    standardShipping = S(content).between('Shipping &amp; Handling: </td>', '</td>').stripTags().collapseWhitespace().s;
    applied = S(content).between('Promotion Applied: </td>', '</td>').stripTags().collapseWhitespace().s;
    orderTotal = S(content).between('Order Total:', '<td colspan="2" class="end" style="padding: 0 0 16px 0; text-align: right; line-height: 18px; vertical-align: top; font-size: 13px; font-family: Arial, sans-serif"> </td>').stripTags().collapseWhitespace().s;

    return{orderNumber: orderNumber, orderDate: orderDate, itemsList: list, subtotal: subtotal, applied: applied, shipping: standardShipping, orderTotal: orderTotal, billingInformation: billingInformation, shippingInformation: shippingInformation};
}