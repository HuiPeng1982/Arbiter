module.exports = {
    'www.amazon.com:order': {
        noseOutRe: /.?Your Amazon.com order of.+\.$/,
        callback: 'amazonParser'
    }, 'www.amazon.com:ship': {
        noseOutRe: /.?Your Amazon.com order of.+ has shipped!$/,
        callback: 'amazonShipParser'
    }, 'www.amazon.de:order': {
        noseOutRe: /.?Ihre Amazon.de Bestellung von.+\.$/,
        callback: 'amazonDeParser'
    }, 'www.amazon.de:ship': {
        noseOutRe: /.?Ihre Amazon.de Bestellung von.+ wurde versandt!$/,
        callback: 'amazonDeShipParser'
    }, 'www.amazon.co.jp:order': {
        noseOutRe: /.?Amazon.co.jp.?ご注文の確認.+/,
        callback: 'amazonJpParser'
    }, 'www.amazon.co.jp:ship': {
        noseOutRe: /.?Amazon.co.jp.?ご注文の.+点の発送$/,
        callback: 'amazonJpShipParser'
    }, 'www.bellemaison.jp': {
        noseOutRe: /^ /
    }, 'www.carters.com:order': {
        noseOutRe: /.?Your Order #\w{11,} with Carters.com \| OshKosh.com/,
        callback: 'cartersParser'
    }, 'www.carters.com:ship': {
        noseOutRe: /.?Carters.com | OshKosh.com Shipment Confirmation - Order #\w{11,}/,
        callback: 'cartersShipParser'
    }, 'www.drugstore.com:order': {
        noseOutRe: /.?Your drugstore.com Order \w{14,} Confirmation$/,
        callback: 'drugstoreParser'
    }, 'www.drugstore.com:ship': {
        noseOutRe: /.?Shipment Confirmation$/,
        callback: 'drugstoreShipParser'
    }, 'www.beauty.com': {
        noseOutRe: /^ /
    }, 'www.gymboree.com:order': {
        noseOutRe: /.?Thank You For Your Gymboree.com Order \w{8,}!/,
        callback: 'gymboreeParser'
    }, 'www.gymboree.com:ship': {
        noseOutRe: /.?Your Gymboree Order \w{8,} Is On Its Way!$/,
        callback: 'gymboreeShipParser'
    }, 'www.victoriassecret.com': {
        noseOutRe: /^ /
        //noseOutRe: /.?Victoria's Secret Order Confirmation - Order #\w{9,}/,
        //callback: 'victoriassecretParser'
    }, 'www.windeln.de': {
        noseOutRe: /^ /
    }, 'item.rakuten.co.jp': {
        noseOutRe: /^ /
    }
};