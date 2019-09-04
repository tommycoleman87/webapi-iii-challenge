const express = require('express');

const server = express();
const userRoutes = require('./users/userRouter.js');
const postsRoutes = require('./posts/postRouter.js');

server.use(express.json())

server.use('/posts',logger, postsRoutes);
server.use('/users',logger, userRoutes);
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  console.log(req.method, req.originalUrl, new Date())
  next();
};

module.exports = server;
