const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const WorkshopEventsAPI = require('./src/api/WorkshopEventsApi');
const ProposalAPI=require('./src/api/ProposalsApi');


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

app.use('/WorkshopEvents', WorkshopEventsAPI());
app.use('/ProposalEvents', ProposalAPI());

mongoose.connection.once('open', () => {
    console.log('Database Connected');
});



app.listen(PORT, () => {
    console.log(`Server is up and running on PORT ${PORT}`);
});
