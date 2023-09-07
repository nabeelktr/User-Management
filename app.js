var express = require('express');
var hbs = require('express-handlebars');
var session = require('express-session');
const path = require('path');

const app = express();

app.set('view engine','hbs');
app.set('views',path.join( __dirname,'views'));
app.engine('hbs',hbs.engine({ extname: 'hbs'}));

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended : true }));

app.use((req,res,next)=>{
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next()
});

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}))

app.listen(3000,()=>{
    console.log('Listening to PORT..')
})


module.exports =app;