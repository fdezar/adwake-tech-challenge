import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import leagueRoutes from './src/routes/leagueRoutes';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Config for accepting req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Connection to MongoDB
mongoose.connect(process.env.MONGODB_URI!, {
  
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/leagues', leagueRoutes);

// Start server
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));
