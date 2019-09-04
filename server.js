const express = require('express');

const server = express();
const userRoutes = require('./users/userRouter.js');
const postsRoutes = require('./posts/postRouter.js');

server.use(express.json())
server.use('/users', userRoutes);
server.use('/posts', postsRoutes);
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {

};

module.exports = server;
