const mongoose = require('mongoose');

const connectDB = async () => {
	const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env
		.DB_PASSWORD}@cluster0.hcqem.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
	const conn = await mongoose.connect(connectionString);
	console.log(`Connected to: ${conn.connection.host}`);
};

module.exports = connectDB;
