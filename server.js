const express = require('express');
const app = express();

app.use(express.json());

app.post('/api/data', (req, res) => {
    console.log(req.body);
    res.send({ success: true });
});

app.get('/', (req, res) => {
    res.send('Server running');
});

app.listen(80, '0.0.0.0', () => {
    console.log('Listening on port 80');
});