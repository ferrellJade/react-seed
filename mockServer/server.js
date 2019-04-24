const nodePath = require('path');
const mockFactory = require('./mock');
const server = require('express')();

server.listen(8000, function(err, result) {
    if (err) {
        return console.log(err);
    }
    console.log('Listening at http://127.0.0.1:8000/');
});

server.use(mockFactory({
    'urlPattern': '/',
    'dataPath': nodePath.join(__dirname, './data'),
    'skipNotFound': true
}));
