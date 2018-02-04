var express = require('express');
var app = express();
var path = require('path');

var dir = __dirname + '/../build';
var port = 8080;

app.use(express.static(dir));
app.get('*', function(req, res) {
    res.sendFile(path.resolve(dir + '/index.html'));
});
app.listen(process.env.PORT || port, () => {
    console.log('listening on port ' + port);
});