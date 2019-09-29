var fs = require('fs');
var path = require('path');

var static = function (req, res, dir) {
    console.log(`${req.method} request for ${req.url}`);

    if (req.url === '/') {
        fs.readFile(path.join(__dirname, 'index.html'), "UTF-8", function (err, htmlFile) {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(htmlFile);
        });

    }
    // CSS FILES
    else if (req.url.match(/.css$/)) {
        var cssPath = path.join(__dirname, dir, req.url);
        //create a readable stream (text encoding UTF-8)
        var fileStream = fs.createReadStream(cssPath, "UTF-8");
        res.writeHead(200, { "Content-Type": "text/css" });

        //pipe the readable stream to writable stream
        //res is writable stream
        fileStream.pipe(res);
    }
    // IMAGE FILES
    else if (req.url.match(/.jpg$/)) {
        var imgPath = path.join(__dirname, dir, req.url);
        //create a binary read stream (not UTF-8)
        var imgStream = fs.createReadStream(imgPath);

        res.writeHead(200, { "Content-Type": "image/jpeg" });
        //pipe the image read stream to the response write stream
        imgStream.pipe(res)
    } else if (req.url.match(/.js$/)) {
        var jsPath = path.join(__dirname, dir, req.url);
        //create a binary read stream (not UTF-8)
        var jsStream = fs.createReadStream(jsPath);

        res.writeHead(200, { "Content-Type": "text/script" });
        //pipe the image read stream to the response write stream
        jsStream.pipe(res)
    }
}

module.exports = static;

