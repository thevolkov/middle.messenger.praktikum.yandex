const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const indexFile = path.join(__dirname, '/dist/index.html');

app.use(express.static('./dist/'));

app.get('/*', function (request, response) {
    response.sendFile(indexFile);
});

app.listen(PORT, function () {
    console.log(`// СЕРВЕР ЗАПУЩЕН // ПОРТ: ${PORT}`);
});
