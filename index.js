var express = require('express');
var path = require('path');
var fs = require('fs');
var busboy = require('connect-busboy');

var app = express();

app.use(busboy());
app.get('/', function(req, res) {
	res.redirect('/app');
});

app.post('/upload', function(req, res) {
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename); 
        fstream = fs.createWriteStream(__dirname + '/uploads/' + filename);
        file.pipe(fstream);
        fstream.on('close', function () {
            res.redirect('back');
        });
    });
});

app.get('/app', function(req, res) {
    res.render('app/app-show');
});

app.get('/app/create', function(req, res) {
    res.render('app/app-create');
});

app.get('/app/edit/:id', function(req, res) {
    res.render('app/app-edit');
});

app.set('view engine', 'pug');
app.set('views', './views');

app.use('/public', express.static('public'));
app.use('/uploads', express.static('uploads'));
app.listen(3000);