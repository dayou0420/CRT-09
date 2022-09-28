const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
app.use(express.static(__dirname + '/public'));
console.log('Served: http://localhost:' + port);
app.get('/food', (_, res) => {
    res.sendFile(__dirname + '/public/food/index.html');
});
app.get('/project', (_, res) => {
    res.sendFile(__dirname + '/public/project/index.html');
});
app.get('/weather', (_, res) => {
    res.sendFile(__dirname + '/public/weather/index.html');
});
app.listen(port);
