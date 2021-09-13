const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/api', (req, res) => {
    res.send('API Running');
});

// Define Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/register', require('./routes/api/register'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
