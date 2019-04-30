const nodePath = require('path');
const mockFactory = require('./mock');
const server = require('express')();

server.listen(8000, function(err, result) {
    if (err) {
        return console.log(err);
    }
});

server.use(mockFactory({
    'urlPattern': '/',
    'dataPath': nodePath.join(__dirname, './data'),
    'skipNotFound': true
}));
