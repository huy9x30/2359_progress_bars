var http = require("http"),
    path = require("path"),
    url = require("url"),
    fs = require("fs"),
    CleanCSS = require('clean-css');

const apiResponse = {"buttons": [21, 19, -48, -30], "bars": [62, 64, 83], "limit": 130}
const port = 8080
const notFoundContent = '<div id="error" style="text-align: center;font-size: 36px;margin-top: 35vh;">' +
    '<span>404 - Not found</span><br>' +
    '<a href="/">Homepage</a>' +
    '</div>'

const notFoundResponse = (response) => {
    response.writeHead(404, {'Content-Type': 'text/html'});
    response.write(notFoundContent);
    return response
}

http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    var ext = path.extname(pathname);

    if (pathname === '/api/endpoint') {
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.write(JSON.stringify(apiResponse))
    } else if (ext) {
        if (/^\/public\/.*/.test(pathname)) {
            const fileContent = fs.readFileSync(__dirname + pathname, 'utf8')
            if (ext === '.css') {
                response.writeHead(200, {'Content-Type': 'text/css'});
                response.write(
                    (new CleanCSS().minify(fileContent)).styles
                );
            } else if (ext === '.js') {
                response.writeHead(200, {'Content-Type': 'text/javascript'});
                response.write(fileContent);
            }
        } else {
            response = notFoundResponse(response)
        }
    } else if (pathname === '/') {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(fs.readFileSync('index.html', 'utf8'));
    } else {
        response = notFoundResponse(response)
    }

    response.end();
}).listen(port, 'localhost')
console.log(`Server started on http://localhost:${port}`)