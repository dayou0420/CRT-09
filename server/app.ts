const express = require('express');
const app = express();

const port = process.env.PORT || 8080;

// Serve static files
app.use(express.static(__dirname + '../../../public'));

// Serve your app
console.log('Served: http://localhost:' + port);
app.listen(port);
