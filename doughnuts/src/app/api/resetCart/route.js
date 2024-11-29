export const dynamic = 'forced-dynamic';
import { getCustomSession } from '../sessionCode';
const { MongoClient, ServerApiVersion } = require('mongodb');

export async function GET(req, res) {

    
    const uri = "mongodb+srv://root:lUJeU2iPcFlE53tb@database.gau0z.mongodb.net/?retryWrites=true&w=majority&appName=database";
    const client = new MongoClient(uri);
   
        await client.connect();
        console.log('Connected to client');
        const db = client.db('Krispee');
        const col = db.collection('cart');
        const newCol = db.collection('orders');
        const Resp = await col.find({}).toArray();
        //Move cart items to orders collection with email from session
        const session = await getCustomSession();
        const email = session.email;
        const orders = col.map(item => ({
            p_name: item.p_name,
            p_price: item.p_price,
            email: email,
        }));
        const addResults = await newCol.insertMany(orders);
        console.log(addResults);
        const delResults = await col.deleteMany({});

        console.log(Resp);
        return Response.json("All items deleted!");
    

}