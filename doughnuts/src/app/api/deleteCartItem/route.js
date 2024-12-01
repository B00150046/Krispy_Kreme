export const dynamic = 'forced-dynamic';

export async function GET(req, res) {
    const { searchParams } = new URL(req.url);
    const p_name = searchParams.get('pname');
    const time = searchParams.get('time_added');
    const price = parseFloat(searchParams.get('price')); // Ensure price is a number

    console.log(`Product Name: ${p_name}, Price: ${price}, Time Added: ${time}`);

    // Validate inputs
    if (!p_name || isNaN(price) || !time) {
        return res.status(400).json({ error: "Invalid product name, price, or time_added" });
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

        // Delete the item based on product name and time added
        const result = await collection.deleteOne({ 
            item_name: p_name,
            time_added: time
        });

        // Check the for deletion
        if (result.deletedCount === 1) {
            console.log('Successfully deleted the item');
            return res.status(200).json({ data: "Item successfully deleted" });
        } else {
            console.log('No matching item found to delete');
            return res.status(404).json({ error: "Item not found" });
        }

   
}
