var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
    db.createTable('googleapi',{
        name:'text',
        apikey:'text'
    },callback);
};

exports.down = function(db, callback) {
    db.dropTable('googleapi',callback);
};
