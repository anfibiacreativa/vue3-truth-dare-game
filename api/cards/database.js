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
        const DB_NAME = 'TruthorDare';
        console.log('Is this a codespace? >>>>>', process.env.CODESPACES);
        const CONNECTION_STRING = process.env.CODESPACES ? process.env.COSMOS_DB_CONNECTION_STRING : process.env['CosmosDbConnectionString'];
        await mongoose.connect(
            CONNECTION_STRING,
            { 
                dbName: DB_NAME,
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
