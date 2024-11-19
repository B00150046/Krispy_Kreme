const { MongoClient, ServerApiVersion } = require('mongodb');

export async function GET(req, res) {

    
    const uri = "mongodb+srv://root:lUJeU2iPcFlE53tb@database.gau0z.mongodb.net/?retryWrites=true&w=majority&appName=database";
    const client = new MongoClient(uri);
    try{
        await client.connect();
        console.log('Connected to client');
        const db = client.db('Krispee');
        const col = db.collection('orders');
        const Resp = await col.find({}).toArray();
        console.log(Resp);
        return Response.json(Resp);
    }
    catch (err) {
        console.log(err.stack);
    } finally {
        await client.close();
    }

}