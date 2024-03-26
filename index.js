const express = require('express');
require('dotenv').config();

const port = process.env.PORT || 3000;
const mongodb_connect = process.env.MONGO_URI;
const app = express();


// middleware
app.use(express.json());

// routes


app.get('/', (req, res) => {
    res.send('<h1>JWT Basic</h1>');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});