const port = 1337;

const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const path = require('path');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

server.use(bodyParser.urlencoded({extended: false}));
server.use(express.static(path.join(__dirname, 'public')));

server.use(adminRoutes);
server.use(shopRoutes);
server.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

server.listen(port);