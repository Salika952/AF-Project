const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const userAPI=require('./src/api/UsersApi');
const NotificationAPI=require('./src/api/NotificationApi');
const fileUpload = require('express-fileupload');
const ResearchEventApi = require('./src/api/ResearchEventApi');
const ConferenceAPI=require('./src/api/ConferenceApi');
const WorkshopEventAPI = require('./src/api/WorkshopEventsApi');
const PaperAPI = require('./src/api/PapersApi');
const ProposalAPI = require('./src/api/ProposalsApi');
const PaymentAPI = require('./src/api/PaymentApi');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload({
    useTempFiles:true
}))
app.use(bodyParser.json({ limit:"30mb",extended: true}));
app.use(bodyParser.urlencoded({ limit:"30mb",extended: true}));

const PORT = process.env.PORT || 4002;
const MONGODB_URI = process.env.MONGODB_URI3;

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

app.use('/users', userAPI());
app.use('/notify', NotificationAPI());
app.use('/ResearchEvent', ResearchEventApi());
app.use('/Conference', ConferenceAPI());
app.use('/WorkshopEvent', WorkshopEventAPI());
app.use('/paper', PaperAPI());
app.use('/Proposals', ProposalAPI());
app.use('/payment', PaymentAPI());

app.listen(PORT, () => {
    console.log(`Server is up and running on PORT ${PORT}`);
});