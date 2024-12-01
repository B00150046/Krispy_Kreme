const { MongoClient, ServerApiVersion } = require('mongodb');

export async function GET(req, res) {

    
    const uri = process.env.DB_ADDRESS
    const client = new MongoClient(uri);
   
        await client.connect();
        console.log('Connected to client');
        const db = client.db('Krispee');
        const col = db.collection('orders');
        const Resp = await col.find({}).toArray();
        console.log(Resp);
        return Response.json(Resp);
    

}