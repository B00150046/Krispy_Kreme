const { MongoClient, ServerApiVersion } = require('mongodb');

export async function GET(req, res) {

    
    const uri = "mongodb+srv://user:wpFFDYfXTdvLFy2h@database.gau0z.mongodb.net/?retryWrites=true&w=majority&appName=database";
    const client = new MongoClient(uri);
    try{
        await client.connect();
        console.log('Connected to client');
        const db = client.db('Krispee');
        const col = db.collection('cart');
        
     
        return Response.json("Item added to cart");
    }
    catch (err) {
        console.log(err.stack);
    } finally {
        await client.close();
    }

}