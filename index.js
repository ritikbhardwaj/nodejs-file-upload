const multiparty = require('multiparty'),
    http = require('http'),
    path = require('path');

http.createServer(function (req, res) {
    if (req.url == '/upload' && req.method == 'POST') {
        const options = {
            encoding: "utf-8",
            maxFilesSize: 400000, //maximum file size in bytes
            uploadDir: __dirname + "/uploads", //upload directory
            autoFiles: true
        }
        var form = new multiparty.Form(options);
        //parse the incomming multipart form data
        form.parse(req, function (err, fields, files) {
            if (err) {
                res.writeHead(406, { "Content-Type": "text/json" });
                var responseObj = {
                    error: "File too large!",
                    maxFilesSize: 400 + " kb"
                }
                res.end(JSON.stringify(responseObj));
            }
        });
        // when the file event is raised, multipart automatically stores the data to the disk
        form.on('file', function (name, file) {
            res.writeHead(200, { 'Content-Type': 'text/json' });
            console.log(file);
            var fileInfo = {
                originalFileName: file.originalFilename,
                savedFileName: path.basename(file.path),
                path: file.path,
                size: (file.size < 1000) ? file.size + " bytes" : Math.floor(file.size / 1000) + " kb"
            }
            res.end(JSON.stringify(fileInfo));
        });
    } else if (req.url == '/') {
        res.writeHead(200, { 'content-type': 'text/html' });
        res.end(
            '<form action="/upload" enctype="multipart/form-data" method="post">' +
            '<input type="text" name="title"><br>' +
            '<input type="file" name="upload" multiple="multiple"><br>' +
            '<input type="submit" value="Upload">' +
            '</form>'
        );
    }
}).listen(8000, function () {
    console.log("Server started!");
})
