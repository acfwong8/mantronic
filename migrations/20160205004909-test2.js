var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
    db.createTable
  callback();
};

exports.down = function(db, callback) {
  callback();
};
