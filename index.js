const express = require('express');
const app = express();

const router = require('./router.js');

app.use('/', router);
app.use(express.static('./dist', { index: false }));

app.listen(4040, () => console.log('Listening on 4040...'));
