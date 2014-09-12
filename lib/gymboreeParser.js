var S = require('string');

exports.parser = function(mail){
    var content = mail.htmlBody;
    var orderNumber = S(content).between('Order Details For Order #', '<br>').trim().s;
    var orderDate = S(content).between('Ordered On: ', '</span>').trim().s;
    var billingInformation = S(content).between('Ordered By:', '</span>').replaceAll('<br>',' ').stripTags().collapseWhitespace().s;
    var shippingInformation = S(content).between('Shipping Address: ', 'Domestic Economy').replaceAll('<br>',' ').stripTags().collapseWhitespace().s;
    var itemsList = S(content).between('<table width="585" cellspacing="2" cellpadding="0" border="0">', '</table>').s;
    var items = S(itemsList).stripTags('tbody', 'span', 'center', 'tr', 'td', 'b', 'p').replaceAll('<img alt="" name="Cont_5" src="http://gymboree.hs.llnwd.net/e2/media/GYM/images/email/Dynamic/blank_v1_m56577569830753905.gif">','').unescapeHTML().s;
    var forItems = items.split(/\s{2,}/);
    var list = [];
    var item = {};
    var listIndex = 0;
    var itemIndex = 0;
    for(; listIndex < forItems.length; listIndex++){
        if(!S(forItems[listIndex]).isEmpty() && !(forItems[listIndex] in {'Item':'' , 'Price':'', 'Qty.':'', 'Total':''})){

            if(itemIndex === 0){
                item.url = S(forItems[listIndex]).between('href="', '"').s;
                item.img = S(forItems[listIndex]).between('src="', '"').chompRight('?$SHOPBAG$').s;
            }else if(itemIndex === 1){
                item.name = forItems[listIndex];
            }else if(itemIndex === 2){
                item.id = S(forItems[listIndex]).chompLeft('Item# ').s;
            }else if(itemIndex === 3){
                if(!S(forItems[listIndex]).contains('Color:')){
                    item.priceType = forItems[listIndex];
                }else {
                    item.color = S(forItems[listIndex]).chompLeft('Color: ').s;
                    itemIndex++;
                }
            }else if(itemIndex === 4){
                item.color = S(forItems[listIndex]).chompLeft('Color: ').s;
            }else if(itemIndex === 5){
                item.size = S(forItems[listIndex]).chompLeft('Size: ').s;
            }else if(itemIndex === 6){
                item.price = forItems[listIndex];
            }else if(itemIndex === 7){
                item.quantity = forItems[listIndex];
            }else if(itemIndex === 8){
                item.total = forItems[listIndex];
            }
            itemIndex++;

            if(itemIndex === 9){
                itemIndex = 0;
                list.push(item);
                item = {};
            }

        }
    }
    var subtotal, applied, reword, standardShipping, tax, shippingDiscount, orderTotal;
    var temTotal = S(content).between('<td width="585"><table width="585" cellspacing="2" cellpadding="0" border="0">','</table></td>').collapseWhitespace().s;
    var fortemTotal = temTotal.split('</span>');
    var fortemTotalIndex = 0;
    var tTotal = '';
    for(; fortemTotalIndex < fortemTotal.length; fortemTotalIndex++){
        tTotal = S(fortemTotal[fortemTotalIndex]).stripTags();
        if(tTotal.contains('Subtotal Of Items:')){
            subtotal = S(fortemTotal[fortemTotalIndex+1]).stripTags().trim().s;
        }else if(tTotal.contains('Promotional Code:')){
            applied = S(fortemTotal[fortemTotalIndex+1]).stripTags().replace('(','').replace(')','').trim().s;
        }else if(tTotal.contains('Rewards Redemption:')){
            reword = S(fortemTotal[fortemTotalIndex+1]).stripTags().replace('(','').replace(')','').trim().s;
        }else if(tTotal.contains('Shipping and Handling:')){
            standardShipping = S(fortemTotal[fortemTotalIndex+1]).stripTags().trim().s;
            shippingDiscount = '$0.00';
        }else if(tTotal.contains('Taxes:')){
            tax = S(fortemTotal[fortemTotalIndex+1]).stripTags().trim().s;
        }else if(tTotal.contains('Total Charges:')){
            orderTotal = S(fortemTotal[fortemTotalIndex+1]).stripTags().trim().s;
        }

    }
    var result = [];
    result.push({orderNumber: orderNumber, orderDate: orderDate, itemsList: list, subtotal: subtotal, applied: applied, reword: reword, shipping: standardShipping, tax: tax, shippingDiscount: shippingDiscount, orderTotal:orderTotal, billingInformation: billingInformation, shippingInformation: shippingInformation});
    return result;
};