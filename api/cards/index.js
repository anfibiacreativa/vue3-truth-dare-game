const { cardModel } = require('./cards');
const { dbConnect } = require('./database');

module.exports = async function(context) {
    await dbConnect(context.log);

    let body = context.bindings.req.body;
    let type = body.split('=')[1];
    try {
        if (!type) {
            console.log('no type');
            context.res = {
                status: 400,
                body: `Please provide a card type!`
            };
            return;
        }
    }
    catch (err) {  
        context.res = {
            status: 500,
            body: `Sorry. There was an error processing your request: ${err}`
        };
        process.exit(1);
    }
    // using skip to randomize because $sample is not working as expected :(
    let skip = Math.floor(Math.random() * 30) + 1;
    let query = await cardModel.aggregate([
        { $match: { type: type } },
        { $skip: skip }
    ]).limit(9).exec();   
    context.res = {
        status: 200,
        header: {
            "Content-Type": "application/json"
        },
        body: query
    };
}
