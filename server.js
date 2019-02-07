const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = (`${now}: ${req.method} ${req.url}`);

    console.log(log);
    fs.appendFile('server.log', log +'\n', (err) => {
        if(err) throw err;
    });
    next();
});
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.use((req, res, next) =>{
    res.render('magnets.hbs');
});

app.get('/',(req, res) => {
    res.render('home.hbs', {
            pageTitle: 'Home',
            welcomeMessage: 'Welcome home, ma little hobo'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMassege: 'ERROR'
    });
})

app.listen(3000, () => {
    console.log('Server working..'); 
});