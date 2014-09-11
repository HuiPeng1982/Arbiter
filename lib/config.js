module.exports = {
    'www.amazon.com': {
        noseOutRe: /.?Your Amazon.com order of.+\./,
        callback: 'amazonParser'
    }, 'www.amazon.de': {
        noseOutRe: /^ /
    }, 'www.amazon.co.jp': {
        noseOutRe: /^ /
    }, 'www.beauty.com': {
        noseOutRe: /^ /
    }, 'www.bellemaison.jp': {
        noseOutRe: /^ /
    }, 'www.carters.com': {
        noseOutRe: /.?Your Order #\w{11,} with Carters.com \| OshKosh.com/,
        callback: 'cartersParser'
    }, 'www.oshkosh.com': {
        noseOutRe: /^ /
    }, 'www.drugstore.com': {
        noseOutRe: /^ /
    }, 'www.gymboree.com': {
        noseOutRe: /.?Thank You For Your Gymboree.com Order \w{8,}!/,
        callback: 'gymboreeParser'
    }, 'www.victoriassecret.com': {
        noseOutRe: /^ /
    }, 'www.windeln.de': {
        noseOutRe: /^ /
    }, 'item.rakuten.co.jp': {
        noseOutRe: /^ /
    }, 'www.gap.com/': {
        noseOutRe: /^ /
    }
};