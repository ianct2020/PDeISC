const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'publica')));

app.get('/pagina1', (req, res) => {
    res.sendFile(path.join(__dirname, 'publica', 'pagina1.html'));
});

app.listen(3011, '127.0.0.1', () => {
    console.log('http://127.0.0.1:3011');
});