// Create web server
// Run `node comments.js`
// Access http://localhost:3000 in your web browser

var http = require('http');
var fs = require('fs');
var url = require('url');
var comments = [];

var server = http.createServer(function (request, response) {
    var parsedUrl = url.parse(request.url, true);
    var pathWithQuery = request.url;
    var queryString = '';
    if (pathWithQuery.indexOf('?') >= 0) {
        queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'));
    }
    var path = parsedUrl.pathname;
    var query = parsedUrl.query;
    var method = request.method;

    if (path === '/index.html') {
        response.setHeader('Content-Type', 'text/html; charset=utf-8');
        response.write(fs.readFileSync('./index.html'));
        response.end();
    } else if (path === '/style.css') {
        response.setHeader('Content-Type', 'text/css; charset=utf-8');
        response.write(fs.readFileSync('./style.css'));
        response.end();
    } else if (path === '/main.js') {
        response.setHeader('Content-Type', 'application/javascript; charset=utf-8');
        response.write(fs.readFileSync('./main.js'));
        response.end();
    } else if (path === '/comments' && method === 'GET') {
        response.setHeader('Content-Type', 'application/json; charset=utf-8');
        response.write(JSON.stringify(comments));
        response.end();
    } else if (path === '/comments' && method === 'POST') {
        response.setHeader('Content-Type', 'application/json; charset=utf-8');
        var comment = { id: comments.length, date: new Date(), ...query };
        comments.push(comment);
        response.write(JSON.stringify(comment));
        response.end();
    } else {
        response.statusCode = 404;
        response.end();
    }
});

server.listen(3000, function () {
    console.log('Server is running on http://localhost:3000');
});