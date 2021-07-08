require('dotenv').config();

//
// Dependencies
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const { handleError, ErrorHandler } = require('./helpers/error');




// Mongo config
mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== 'test') {
    mongoose.connect(`mongodb://${process.env.DB_URL}:${process.env.DB_PORT}+/${process.env.DB_NAME}`, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    },(err) => {
        if (err) console.log(err);
        console.info("Connected");
    });
}

// Express configuration
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    return next();
});



require('./models/AclModel');
require('./models/AccountModel');
require('./models/GroupeModel');
require('./models/UploadModel');

app.use(`/acls`, require('./routers/AclRouter'));
app.use(`/auth`, require('./routers/AuthRouter'));
app.use(`/groups`, require('./routers/GroupeRouter'));
app.use(`/upload`, require('./routers/UploadRouter'));


app.use((req, res, next) => {
    throw new ErrorHandler(404, 'Resource not found');
});


app.use((err, req, res, next) => {
    handleError(err, res);
});


app.listen(process.env.PORT);

module.exports = app;
