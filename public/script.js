//Make a POST request with multipart form data
async function uploadFile(url, formData) {
    const response = await fetch(url, {
        method: 'POST',
        body: formData
    });
    const data = await response.json();
    return data;
}
//Make a GET request to get the list of the files
async function getFiles(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

$(document).ready(function () {
    $('#btnUpload').click(function () {
        console.log($('#inp')['0'].files);
        const formData = new FormData();
        for (const file of $('#inp')['0'].files) {
            formData.append('myFile', file);
        }

        uploadFile("https://ritik-file-upload.herokuapp.com/upload", formData).then(function (resp) {
            console.log(resp);
        });
    });
    //If the refresh button is pressed, clear all the children of the #files div and append the new list.
    $('#btnRefresh').click(function () {
        $('.file-display #files').empty()
        getFiles('https://ritik-file-upload.herokuapp.com/files').then(function (response) {
            response.forEach(function (file) {
                $('#files').append(`<h3>${file}</h3>`);
            })
        });
    });
});

