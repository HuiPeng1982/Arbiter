var S = require('string');

exports.parser = function(mail){
    var content = mail.htmlBody;
    var itemsBefore = S(content).contains('<td class="ecxphoto" style="width:150px;text-align:center;padding:16px 0 10px 0;vertical-align:top;font:13px/ 18px Arial, sans-serif;">')
        ? '<td class="ecxphoto" style="width:150px;text-align:center;padding:16px 0 10px 0;vertical-align:top;font:13px/ 18px Arial, sans-serif;">'
        : '<table style="width: 95%; border-collapse: collapse" id="itemDetails">';
    var result = [];
    result.push(amazonParser(content, itemsBefore, ' Zwischensumme: '));
    return result;
};

var amazonParser = function(content, itemsBefore, itemsAfter){
    var orderNumber = S(content).between('Bestellung: #', '</a>').stripTags().trim().s;
    var orderDate = S(content).between('Aufgegeben am ', '</span>').trim().s;
    var billingInformation;
    var shippingInformation = S(content).between('Die Bestellung geht an:', '</b>').replaceAll('<br>', ' ').stripTags().collapseWhitespace().s;
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
                item.id = S(item.url).replaceAll('%2F','/').between('dp/', '/').s;
                item.img = S(forItems[listIndex]).between('src="', '"').replaceAll('_SCLZZZZZZZ__SY115_SX115_.', '').s;
            } else if (itemIndex === 1) {
                item.name = S(forItems[listIndex]).stripTags().trim().s;
            } else if (itemIndex === 2) {
                item.soldBy = S(forItems[listIndex]).stripTags().chompLeft('Verkauft von:').trim().s;
            } else if (itemIndex === 3) {
                item.total = forItems[listIndex];
            }

            itemIndex++;

            if (itemIndex === 4) {
                itemIndex = 0;
                list.push(item);
                item = {};
            }
        }

    }
    var subtotal, tax, standardShipping, orderTotal;
    subtotal = S(content).between('Zwischensumme: </td>', '</td>').stripTags().collapseWhitespace().s;
    standardShipping = S(content).between('Verpackung und Versand: </td>', '</td>').stripTags().collapseWhitespace().s;
    tax = S(content).between('Umsatzsteuer: </td>', '</td>').stripTags().collapseWhitespace().s;
    orderTotal = S(content).between('Endbetrag inkl. USt.:', 'Gewählte Zahlungsart:').stripTags().collapseWhitespace().s;

    return{orderNumber: orderNumber, orderDate: orderDate, itemsList: list, subtotal: subtotal, tax: tax, shipping: standardShipping, orderTotal: orderTotal, billingInformation: billingInformation, shippingInformation: shippingInformation};
}