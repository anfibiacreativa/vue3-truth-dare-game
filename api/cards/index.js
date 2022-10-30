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
    // let find = await cardModel.find({ type: type }).limit(10).exec();
    let find = await cardModel.aggregate([
        { $match: { type: type } },
        { $sample: { size: 50 } }
    ]).limit(6).exec();   
    context.res = {
        status: 200,
        header: {
            "Content-Type": "application/json"
        },
        body: find
    };
}