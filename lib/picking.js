exports.picking = function(con, mail, res){
    var parser = require('./' + con.callback);
    var orders = parser.parser(mail);
    if(res){
        res.jsonp(orders);
    }
};