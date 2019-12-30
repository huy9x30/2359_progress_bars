var util = require("util"),
    http = require("http"),
    path = require("path"),
    url = require("url"),
    fs = require("fs");

const apiResponse = {"buttons": [21, 19, -48, -30], "bars": [62, 64, 83], "limit": 130}

http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    var ext = path.extname(pathname);
    if (pathname === '/endpoint') {
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.write(JSON.stringify(apiResponse))
    } else if (ext) {
        if (ext === '.css') {
            response.writeHead(200, {'Content-Type': 'text/css'});
        } else if (ext === '.js') {
            response.writeHead(200, {'Content-Type': 'text/javascript'});
        }
        response.write(fs.readFileSync(__dirname + pathname, 'utf8'));
    } else {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(fs.readFileSync('index.html', 'utf8'));
    }
    response.end();
}).listen(8800)