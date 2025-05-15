
const express = require('express');
const app= express();
const {redisClient} = require('./redis');

// app.use(express.json());

// app.post('/set', (req, res) => {
//     const { key, value } = req.body;
//     redisClient.set(key, value, (err, reply) => {
//         if (err) {
//             return res.status(500).send('Error setting value in Redis');
//         }
//         res.send(`Value set: ${reply}`);
//     });
// });

app.get('/get/:key', async (req, res) => {
    const { key } = req.params;
    try {
        const value = await redisClient.get(key); // Use Promises
        if (value === null) {
            return res.status(404).send('Key not found');
        }
        res.send(`Value: ${value}`);
    } catch (err) {
        console.error('Error getting value from Redis:', err);
        res.status(500).send('Error getting value from Redis');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});