const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;  
var app = express(); 

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));


app.use((req, res, next) => {
    var now = new Date().toString(); 
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to apped to server.log. ');
        }
    });
    next();
});


hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});


app.get('/', (req, res)=> {
   // res.send('<h1>Hello Express!</h1>');
    res.render('home.hbs', {
        pageName: 'Home', 
        welcomeMessage: 'Welcome To my page'
    });
});

app.get('/about', (req, res)=>{
    res.render('about.hbs', {
        pageName: 'About'
    });

});

app.get('/bad', (req, res)=>{
    res.send({
        errorMessage: 'Fatal error',
        errorCode: 434
    });
});

app.listen(port, ()=>{
    console.log(`Server is running at port ${port}.`);
}); 