const mongoose = require('mongoose');

async function dbConnect(log) {
    // Connect to MongoDB
    try {
        const db = mongoose.connection;
        db.on('connecting', () => {
            log('Connecting to database Truth or Dare. Please wait... 😈')
        });
        db.on('connected', () => { 
            log('Connection Successful. Hooray! 🎉')
        });
        
        await mongoose.connect(
            process.env.COSMOS_DB_CONNECTION_STRING, 
            { 
                dbName: 'TruthorDare',
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );
    }
    catch (err) {
        log(`Connection to database errored with error: ${err} 😭`);
    }
}

module.exports = { dbConnect };
