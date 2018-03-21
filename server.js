const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

//Support for partials
hbs.registerPartials(__dirname + '/views/partials');

//Configuring view engine
app.set('view engine', 'hbs');

//Order of middlewares is important
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

//Middleware to make "public" folder accessible for all(Takes absolute path)
app.use(express.static(__dirname + '/public'));
//app.use: registers a middleware
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);

    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log(err);
        }
    });    
    //Tells express to continue
    next();
});


//Function that can be used in the views
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    //res.send('<h1>Hello express</h1>');
    // res.send({
    //     name: 'Alekz',
    //     likes: ['Football', 'Biking']
    // });
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome MAY FREEND'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to fulfill this request'
    });
})

app.listen(3000, () => {
    console.log('Server up in port: 3000');
});