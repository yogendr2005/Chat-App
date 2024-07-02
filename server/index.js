const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoute');
const messageRoute = require('./routes/mesageRoute');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const { app,server } = require('./socket/socket');

dotenv.config();


const port = 5001;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Authorization', 'Content-Type'],
  credentials: true,
};

app.use(cors(corsOptions));

app.use('/api/user', userRoute);
app.use('/api/message', messageRoute);

server.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
