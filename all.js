function MainCtrl($log) {
    function output(text) {
        console.log(text);
    }

    function fakeAjax(url, cb) {
        var fake_responces = {
            "file1": "The first text",
            "file2": "The second text",
            "file3": "The last text"
        };
        var randomDelay = (Math.round(Math.random() * 1E4) % 8000) + 1000;

        console.log("Requesting: " + url);

        setTimeout(function () {
            cb(fake_responces[url]);
        }, randomDelay);
    }

    var responces = [];

    function addResponce(file, text) {
        switch (file) {
            case 'file1':
                responces[0] = {
                    file: text
                }
                break;
            case 'file2':
                responces[1] = {
                    file: text
                }
                break;
            case 'file3':
                responces[2] = {
                    file: text
                }
                break;
        }
        responces[file] = text;
        if (responces.length === 3) {
            for (var i = 0; i < responces.length; i++) {
                output(responces[i].file);
            }
            console.log('Завершено!');
        }
    }

    function getFile(file) {
        // ваш код может быть тут

        fakeAjax(file, function (text) {
            addResponce(file, text);
        });
    }

// запрашивать все файлы одновременно (параллельно)
    getFile("file1");
    getFile("file2");
    getFile("file3");
}
angular
    .module('cbApp', [])
    .controller('MainCtrl', MainCtrl);