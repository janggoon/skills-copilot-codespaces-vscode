// Create web server application for comments
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

// Create application
var app = express();

// Configure application
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

// Create GET method for comments
app.get('/comments', function (req, res) {
    console.log('GET request received at /comments');

    // Read comments from file
    fs.readFile(__dirname + '/public/comments.json', 'utf8', function (err, data) {
        console.log(data);
        res.end(data);
    });
});

// Create POST method for comments
app.post('/comments', function (req, res) {
    console.log('POST request received at /comments');

    // Read comments from file
    fs.readFile(__dirname + '/public/comments.json', 'utf8', function (err, data) {
        data = JSON.parse(data);

        // Add new comment
        data.push(req.body);

        // Write comments to file
        fs.writeFile(__dirname + '/public/comments.json', JSON.stringify(data, null, 4), function (err) {
            console.log('New comment added');
            res.end(JSON.stringify(data));
        });
    });
});

// Start server
var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    // Display server information
    console.log('Server running at http://%s:%s', host, port);
});



