var S = require('string');

exports.parser = function(mail){
    var content = mail.htmlBody;
    var itemsBefore = '<table style="width:95%;border-collapse:collapse;" id="ecxitemDetails">'
    var result = [];
    result.push(amazonParser(content, itemsBefore, ' 商品の小計：', mail));
    return result;
};

var amazonParser = function(content, itemsBefore, itemsAfter, mail){
    var orderNumber = S(content).between('注文番号： ', '</a>').stripTags().trim().s;
    var orderDate = S(content).between('注文日：', '</span>').trim().s;
    var billingInformation;
    var shippingInformation = S(content).between('お届け先：', '</b>').replaceAll('<br>', ' ').stripTags().collapseWhitespace().s;
    var itemsList = S(content).between(itemsBefore, itemsAfter).s;
    var items = S(itemsList).stripTags('table', 'tbody', 'span', 'div', 'strong', 'tr', 'td', 'b', 'p').unescapeHTML().s;
    var forItems = items.split(/\s{2,}/);
    var list = [];
    var item = {};
    var listIndex = 0;
    var itemIndex = 0;
    for (; listIndex < forItems.length; listIndex++) {
        if (!S(forItems[listIndex]).isEmpty()
            && !(S(forItems[listIndex]).contains('/x-locale/personalization/live-meter/facebook.'))
            && !(S(forItems[listIndex]).contains('/x-locale/communities/social/twitter'))
            && !(S(forItems[listIndex]).contains('/x-locale/communities/social/pinterest'))) {
            if (itemIndex === 0) {
                item.url = S(forItems[listIndex]).between('href="', '"').s;
                item.original_id = S(item.url).between('dp/', '/').s;
                item.url = 'http://www.amazon.co.jp/dp/' + item.original_id + '/';
                item.img = S(forItems[listIndex]).between('src="', '"').replaceAll('_SCLZZZZZZZ__SY115_SX115_.', '').s;
            } else if (itemIndex === 1) {
                item.name = S(forItems[listIndex]).stripTags().trim().s;
            } else if (itemIndex === 2) {
                item.tag = S(forItems[listIndex]).trim().s;
            } else if (itemIndex === 3) {
                item.soldBy = S(forItems[listIndex]).stripTags().chompLeft('販売：').trim().s;
            } else if (itemIndex === 4) {
                item.price = forItems[listIndex];
            }

            itemIndex++;

            if (itemIndex === 5) {
                itemIndex = 0;
                list.push(item);
                item = {};
            }
        }

    }
    var subtotal, standardShipping, orderTotal;
    subtotal = S(content).between('商品の小計： </td>', '</td>').stripTags().collapseWhitespace().s;
    standardShipping = S(content).between('配送料および取扱手数料： </td>', '</td>').stripTags().collapseWhitespace().s;
    orderTotal = S(content).between('クレジットカード（Visa）：</td>', '</td>').stripTags().collapseWhitespace().s;

    var billing_info = '商品の小計：' + S(content).between('商品の小計： </td>',' Amazon.co.jp でのご注文についてくわしくは、').stripTags().collapseWhitespace().unescapeHTML().s;

    return {order_id: orderNumber, supplier: 'AmazonJP', billing_info: billing_info, state: 1, order_date: orderDate, order_items: list, subtotal: subtotal, shipping_or_handling: standardShipping, order_total: orderTotal, delivery_to: shippingInformation,  email: mail.from};
}