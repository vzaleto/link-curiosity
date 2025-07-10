const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3001;
const cors = require('cors');

app.use(cors());
app.use(express.static(path.join(__dirname, 'client/build')));

const LocalData = [];

app.get('/go', async (req, res) => {

    const to = req.query.to;

    if (!to) {
        return res.status(400).send({error: 'Missing to parameter'});
    }
    // проверка URL
    try {
        new URL(to);
    } catch (err) {
        return res.status(400).send({error: 'Invalid URL'});
    }

    const ipHeader = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const ip = ipHeader.split(',')[0];
    const ua = req.headers['user-agent'] || 'unknown';

    let geo = {};


    try {
        geo = await fetch(`http://ip-api.com/json/${ip}`).then(res => res.json());
    } catch (err) {
        geo = {error: err.message || 'Could not fetch geo'};
        // geo = {error: err.message};
    }

    const log = {
        timestamp: new Date().toISOString(),
        ip:ipHeader,
        userAgent: ua,
        location: geo
    }
    LocalData.push(log);
    console.log(JSON.stringify(log, null, 2));
    res.redirect(to);
})
app.get('/log', (req, res) => {
    if(LocalData.length){
        res.json(LocalData)
    }else{
        res.json({Message: 'LocalData is empty'})
    }

})
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});


app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port 'http://0.0.0.0:${PORT}'`);
})
