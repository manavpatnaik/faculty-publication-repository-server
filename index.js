const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const connectDB = require('./config/db');
const facultyRoutes = require('./routes/faculty');
const userRoutes = require('./routes/user');
const publicationRoutes = require('./routes/publication');
const commentRoutes = require('./routes/comment');

// Connecting to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/faculty', facultyRoutes);
app.use('/user', userRoutes);
app.use('/publication', publicationRoutes);
app.use('/comment', commentRoutes);

app.get('/', (req, res) => {
	res.send('Faculty Publication Repository');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
