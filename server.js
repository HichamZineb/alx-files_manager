import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import redis from 'redis';
import routes from './routes/index.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Database Connection
const mongoClient = new MongoClient(process.env.DB_HOST || 'localhost', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoClient.connect((err) => {
  if (err) {
    console.error('MongoDB connection failed:', err);
  } else {
    console.log('Connected to MongoDB');
  }
});

const redisClient = redis.createClient(process.env.REDIS_PORT || 6379);

redisClient.on('error', (err) => {
  console.error('Redis connection failed:', err);
});

// Routes
app.use('/', routes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export { mongoClient, redisClient };
