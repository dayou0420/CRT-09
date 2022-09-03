const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
// Serve static files
app.use(express.static(__dirname + '../../../public'));
// Serve precipitation food app folder
app.get('/food', (_: any, res: any) => {
    res.sendFile(__dirname + '../../../public/food/index.html');
});
// Serve your app
console.log('Served: http://localhost:' + port);
app.listen(port);
