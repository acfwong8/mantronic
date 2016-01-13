var express = require('express');
var multer = require('multer');
var storage = multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,'./uploads');
    },
    filename: function(req,file,callback){
        callback(null,file.fieldname + '-' + Date.now());
    }
});
var upload = multer({ storage : storage}).single('userPhoto');
var path = require('path');
var bodyParser = require('body-parser');
var passport = require('passport');
var pplocal = require('passport-local');
var session = require('express-session');
var logger = require('morgan');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var pg = require('pg');
var pgp = require('pg-promise')(/*options*/);

var app = express();
// var config = require('./config.js');
// var funct = require('./functions.js');

var cn = {
    host:'localhost',
    port:'5432',
    database:'info',
    user:'anguswong',
    password:'yEwuKt61'
};

var cns = 'postgres://'+cn.user+':'+cn.password+'@'+cn.host+':'+cn.port+'/'+cn.database;
console.log(cns);
// app.get('/database',function(req,res,next){
    pg.connect(cns,function(err,client,done){
        if(err){
            return console.error('error fetching',err);
        }
        client.query('SELECT * from login',function(err,result){
            done();
            if(err){
                return console.error('error runnin query',err);
            }
            console.log(result.rows[0].username);
        });
    });
// })
var db = pgp(cn);

// var db = pgp('postgres://anguswong:yEwuKt61@localhost:3000/database/');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));

db.query("SELECT * from login")
    .then(function(data){
        console.log("Data:",data.value);
    })
    .catch(function(error){
        console.log("ERROR:",error);
    });

var saveCategory = function(){
    var categories = [];
    return {
        save: function(entry){
            categories.push(entry);
        }
        
    }
}

app.set('index',path.join(__dirname,'views'));
app.set('view engine','jade');

app.use(express.static(path.join(__dirname,'public')));

app.get('/', function(req,res,next){
    var name = 'company';
    res.render('index',{companyname: name});

});
app.get('/login', function(req,res,next){
    res.render('login');
});
app.post('/logon', passport.authenticate('signIn', {
    successRedirect:'/',
    failureRedirect:'/login'
})
        );

app.get('/new',function(req,res,next){
    res.render('new');
});
app.get('/new/category',function(req,res,next){
    res.render('newCat');
});
app.get('/new/category/success',function(req,res,next){
    res.end('Category created');
})
app.get('/new/item',function(req,res,next){
    res.render('newItem');
});

app.post('/success',function(req,res,next){
    upload(req,res,function(err){
        if(err){
            return res.end("Error uploading");
        }
        res.end("File is uploaded");
    });
    // console.log(req.files);
});



app.get('/category', function(req,res,next){
    var catName = 'laptop';
    res.render('categories',{category: catName});
});

app.listen(3000);
