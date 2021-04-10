const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const cors = require('cors')
const port = process.env.PORT || 5000;
const cronJob = require('./scripts/cron');
const pullAirports = require('./scripts/airports');


app.use(cors())

//use this instead of bodyparser setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", express.static(path.join(__dirname + '/client/build')));
app.use('/api', require('./routes/api'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

// refresh data in S3 bucket
// cronJob.yelpcron();
// cronJob.weathercron();
// cronJob.flightcron();

// pullAirports.pull();
// yelpPars.download();
// yelpPars.parse();

app.listen(port, () => console.log(`Listening on port ${port}`));
