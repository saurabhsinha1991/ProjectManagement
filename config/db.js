const moongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
    try {
       await moongoose.connect(db, {
           useNewUrlParser: true
       });
       console.log('MongoDB connected');
    } catch(err) {
        console.error('DB connected failed', err);
        process.exit(1); // Exit process with failure
    }
}

module.exports = connectDB;