# Node.js server with file upload

A node.js server that supports file upload. Takes in the file as multipart form data and writes the file to a directory on the server.


### Prerequisites

Install [multiparty](https://www.npmjs.com/package/multiparty)

```
npm install multiparty --save
```

### Responses

* If the file is uploaded ***Successfully***

```json
{
    "originalFileName": "file.txt",
    "savedFileName": "6VG_sqOfxJwU3Uz41Zg69YUp.txt",
    "path": "/Users/ritikbhardwaj/Desktop/fileupload/uploads/6VG_sqOfxJwU3Uz41Zg69YUp.txt",
    "size": "40 bytes"
}

```
* If the file size is ***Too large***

```json
{
    "error": "File too large!",
    "maxFilesSize": "400 kb"
}
```


## Authors

* **Ritik Bhardwaj** - *Initial work* - [ritikbhardwaj](https://github.com/ritikbhardwaj)

## License

This project is licensed under the MIT License 



