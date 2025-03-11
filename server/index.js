// server/index.js
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

import path from 'path';
import { fileURLToPath } from 'url';



const app = express();



dotenv.config();

// Get the directory name for ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, '../client/dist')));

// console.log('JWT_SECRET:', process.env.JWT_SECRET); // Log the JWT_SECRET to check if it's loaded


// Middleware to parse JSON bodies
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB Atlas using MONGO_URI from .env
mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Mount user routes at /api/users
app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);

// --------------------------deployment------------------------------



// Catch-all route to serve the React app's index.html for any other route
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
});


// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
