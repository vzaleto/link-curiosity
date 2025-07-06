const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3001;


app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/go', async (req, res) => {

    const to = req.query.to;

    if (!to) {
        return res.status(400).send({error: 'Missing to parameter'});
    }



    // проверка URL
    try {
        new URL(to);
    } catch (err) {
        return res.status(400).send({ error: 'Invalid URL' });
    }

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const ua = req.headers['user-agent'] || 'unknown';

    let geo = {};

    try {
        geo = await fetch(`http://ip-api.com/json/${ip}`).then(res => res.json());
    } catch (err) {
        geo = { error: err.message || 'Could not fetch geo' };
        // geo = {error: err.message};
    }

    const log = {
        timestamp: new Date().toISOString(),
        ip,
        userAgent: ua,
        location: geo
    }

    console.log(JSON.stringify(log, null, 2));

    console.log({ to });

    res.set('ngrok-skip-browser-warning', 'true');
    res.redirect(to);
})

// app.get('*', (req, res) => {
//
//     const requestedPath = req.path;
//
//     if (requestedPath.startsWith('http')) {
//         return res.status(400).send('Invalid path');
//     }
//
//     res.sendFile(path.join(__dirname, 'client/build/index.html'));
// })

app.listen(PORT,'0.0.0.0', () => {
    console.log(`Server listening on port 'http://0.0.0.0:${PORT}'`);
})
