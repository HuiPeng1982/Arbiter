var S = require('string');
var _ = require('underscore');
var config = require('./config');


exports.sorting = function(mail, callback, res){
    if(!mail){
        throw new Error("First argument expected to be a mail object!");
    }
    if(!callback || typeof callback !== "function"){
        throw new Error("Second argument expected to be a callback function!");
    }
    var con = noseout(mail.subject);
    return callback(con, mail, res);
};

var noseout = function(subject){
    if(S(subject).isEmpty()){
        throw new Error("First argument expected to be a mail subject!");
    }
    return _.find(config, function(con){ return _.isRegExp(con.noseOutRe) && con.noseOutRe.test(subject); });
};