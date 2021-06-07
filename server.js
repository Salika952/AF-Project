const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const PaymentAPI = require('./src/api/PaymentApi');
const UserAPI = require('./src/api/UsersApi');
const PaperAPI = require('./src/api/PapersApi');

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 4002;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true

}, (error) => {
    if (error) {
        console.log('Database Error: ', error.message);
    }
});

mongoose.connection.once('open', () => {
    console.log('Database Connected');
});

app.route('/').get((req, res) => {
    res.send('SLIIT AF FINAL API BY SE2021 BATCH');
});

app.use('/payment', PaymentAPI());
app.use('/user', UserAPI());
app.use('/paper', PaperAPI());

app.listen(PORT, () => {
    console.log(`Server is up and running on PORT ${PORT}`);
});