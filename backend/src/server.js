const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const server = express();

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/Tindev');

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(3333);

// mongodb+srv://lucashenrique:ZSegojtekoqghRMD@cluster0-h6qbp.mongodb.net/Portfolio?retryWrites=true&w=majority