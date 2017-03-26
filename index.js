const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const router = require('./router.js');

app.use(bodyParser.json());
app.use(express.static('./dist'));
app.use('/api', router);
app.get('/*', (req, res) => res.sendFile(path.join(__dirname, 'dist', 'index.html')));

app.listen(4040, () => console.log('Listening on 4040...'));
