var request = require('request');

exports.picking = function(con, mail, res){
    var parser = require('./' + con.callback);
    var orders = parser.parser(mail);
    request.post('http://127.0.0.1:3000/orders').form({orders : JSON.stringify(orders)});
    if(res){
        res.jsonp(orders);
    }
};