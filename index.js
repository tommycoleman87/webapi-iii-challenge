// code away!
require('dotenv').config();
const server = require('./server.js');
const port = process.env.PORT;

server.listen(port, () => {
    console.log(`API listening on port ${port}`)
})