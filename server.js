const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/register', require('./routes/api/register'));
app.use('/api/projects', require('./routes/api/projects'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.use('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
