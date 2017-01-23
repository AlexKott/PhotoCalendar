const express = require('express');
const app = express();

const travelRouter = require('./router.js');

const port = 4040;

app.use(express.static('dist'));

app.use('/', travelRouter);

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});
