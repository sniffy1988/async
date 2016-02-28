function MainCtrl($q) {
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


    function getFile(file) {
        var defer = $q.defer();
        var prom = fakeAjax(file, function (text) {
            defer.resolve(text);
        });
        return defer.promise;
    }

// запрашивать все файлы одновременно (параллельно)
    getFile("file1").then(function (text) {
        output(text);
        getFile("file2").then(function (text) {
            output(text);
            getFile("file3").then(function (text) {
                output(text);
                output('Завершено!');
            });
        });
    });
}
angular
    .module('cbApp', [])
    .controller('MainCtrl', MainCtrl);