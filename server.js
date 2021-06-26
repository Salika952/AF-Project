const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const ResearchEventApi = require('./src/api/ResearchEventApi');
const ConferenceAPI=require('./src/api/ConferenceApi');
const UserAPI = require('./src/api/UsersApi');
const WorkshopEventAPI = require('./src/api/WorkshopEventsApi');
const PaperAPI = require('./src/api/PapersApi');
const ProposalAPI = require('./src/api/ProposalsApi');


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

app.use('/ResearchEvent', ResearchEventApi());
app.use('/Conference', ConferenceAPI());
app.use('/Users', UserAPI());
app.use('/WorkshopEvent', WorkshopEventAPI());
app.use('/Papers', PaperAPI());
app.use('/Proposals', ProposalAPI());

mongoose.connection.once('open', () => {
    console.log('Database Connected');
});



app.listen(PORT, () => {
    console.log(`Server is up and running on PORT ${PORT}`);
});
