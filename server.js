var express = require('express');
var app = express();
app.use(express.static('src/client/public'));

app.listen(3000);
