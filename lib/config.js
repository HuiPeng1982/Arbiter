module.exports = {
    'www.amazon.com': {
        noseOutRe: /.?Your Amazon.com order of.+/,
        callback: 'amazonParser'
    }, 'www.amazon.de': {
        noseOutRe: /.?Ihre Amazon.de Bestellung von.+/,
        callback: 'amazonDeParser'
    }, 'www.amazon.co.jp': {
        noseOutRe: /.?Amazon.co.jp ご注文の確認.+/,
        callback: 'amazonJpParser'
    }, 'www.beauty.com': {
        noseOutRe: /^ /
    }, 'www.bellemaison.jp': {
        noseOutRe: /^ /
    }, 'www.carters.com': {
        noseOutRe: /.?Your Order #\w{11,} with Carters.com \| OshKosh.com/,
        callback: 'cartersParser'
    }, 'www.oshkosh.com': {
        noseOutRe: /.?Your Order #\w{11,} with Carters.com \| OshKosh.com/,
        callback: 'cartersParser'
    }, 'www.drugstore.com': {
        noseOutRe: /.?Your drugstore.com Order \w{14,} Confirmation/,
        callback: 'drugstoreParser'
    }, 'www.gymboree.com': {
        noseOutRe: /.?Thank You For Your Gymboree.com Order \w{8,}!/,
        callback: 'gymboreeParser'
    }, 'www.victoriassecret.com': {
        noseOutRe: /^ /
    }, 'www.windeln.de': {
        noseOutRe: /^ /
    }, 'item.rakuten.co.jp': {
        noseOutRe: /^ /
    }
};