const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const facultyRoutes = require('./routes/faculty');
dotenv.config();

// Connecting to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/faculty', facultyRoutes);

app.get('/', (req, res) => {
	res.send('Faculty Publication Repository');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
