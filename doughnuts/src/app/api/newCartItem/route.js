export const dynamic = 'forced-dynamic';
export async function GET(req, res) {
   
        const { searchParams } = new URL(req.url);
        const p_name = searchParams.get('pname');
        const price = parseFloat(searchParams.get('price')); // Ensure price is a number
        const time = new Date().toLocaleString();

        console.log(`Product Name: ${p_name}, Price: ${price}`);

        // Validate inputs
        if (!p_name || isNaN(price)) {
            return res.status(400).json({ error: "Invalid product name or price" });
        }

        // Connect to MongoDB
        const { MongoClient } = require('mongodb');
        const uri = "mongodb+srv://root:lUJeU2iPcFlE53tb@database.gau0z.mongodb.net/?retryWrites=true&w=majority&appName=database";
        const client = new MongoClient(uri);
        const dbName = 'Krispee';

        await client.connect();
        console.log('Connected successfully to server');

        const db = client.db(dbName);
        const collection = db.collection('cart'); // Collection for cart items

        // Insert product into the cart collection
        const result = await collection.insertOne({
            item_name: p_name,
            price: price,
            time
        });

        console.log('Insert Result:', result);


        return Response.json({"data":"added"})

    }
