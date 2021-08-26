const express = require('express');
const mongoose = require('mongoose')
const mongodb = require('./mongodb.json');
const app = express();

app.use(express.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'https://niceshop.4c3711.xyz, http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'application/json');
    next();
});

require('./routes/accounts')(app);
require('./routes/publicUserData')(app);

mongoose.connect(mongodb.mdbConnectURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('[niceshop.moe server] connected to mongodb database')
    app.listen(9002, () => {
        console.log('[niceshop.moe server] backend server is now running')
    });
}).catch((err) => {
    console.log(err)
})