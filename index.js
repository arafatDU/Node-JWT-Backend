const express = require('express');
const connectDB = require('./db/connect.js');
const authRoute = require('./routes/authRoute.js');
const notFoundMiddleware = require('./middleware/not-found.js');
const errorHandlerMiddleware = require('./middleware/error-handler.js');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const mongodb_connect = process.env.MONGO_URI;
const app = express();


// middleware
app.use(express.static('./public'));
app.use(express.json());


// routes
app.use('/api/v1', authRoute);


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);


const start = async () => {
    try {
      await connectDB(mongodb_connect);
      app.listen(PORT, console.log(`Server is listening on port ${PORT}`));
    } catch (error) {
      console.error(error);
    }
}
  
start();