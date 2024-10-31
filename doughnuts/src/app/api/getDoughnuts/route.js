export async function getDoughnuts(req, res) {

    const {MongoClient} = require('mongodb');
    const url = process.env.MONGODB_URI;
    const client = new MongoClient(url);
    const dbName = 'Krispee';
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('products');
    const Response = await collection.find().toArray();
    return Response.json()
}