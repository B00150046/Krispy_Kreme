const { MongoClient, ServerApiVersion } = require('mongodb');
export const dynamic = 'forced-dynamic';
export async function GET(req, res) {

    
    const uri = process.env.DB_ADDRESS
    const client = new MongoClient(uri);
    try{
        await client.connect();
        console.log('Connected to client');
        const db = client.db('Krispee');
        const col = db.collection('products');
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