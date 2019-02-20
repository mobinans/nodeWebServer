//after installed 'npm install express --save', first file created server.js
const express = require('express');
const fs = require('fs');

const port = process.env.PORT || 3000;

//installed from template engine 'npm install hbs --save', hbs stand for 'handlebarsjs'
const hbs = require('hbs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//Middleware
app.use((req, res, next) => {
    
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to append file' );
        }
    });
    next();
});

// Middleware
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

//for dynamic route...like...localhost:3000/help.html
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('sreamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
   res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to our page..',
   })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About us',
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to fetch data.'
    });
});

//second argument is Optional
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

