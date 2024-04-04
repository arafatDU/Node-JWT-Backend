const express = require('express');
const connectDB = require('./db/connect.js');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const mongodb_connect = process.env.MONGO_URI;
const app = express();


// middleware
app.use(express.json());

// routes




app.get('/', (req, res) => {
    res.send('<h1>JWT Basic</h1>');
});

const start = async () => {
    try {
      await connectDB(mongodb_connect);
      app.listen(PORT, console.log(`Server is listening on port ${PORT}`));
    } catch (error) {
      console.error(error);
    }
}
  
start();