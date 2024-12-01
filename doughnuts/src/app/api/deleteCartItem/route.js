export const dynamic = 'forced-dynamic';

export async function GET(req, res) {
    const { searchParams } = new URL(req.url);
    const p_name = searchParams.get('pname');
    const time = searchParams.get('time_added');
    const price = parseFloat(searchParams.get('price')); // Ensure price is a number

    console.log(`Delete Request - Product Name: ${p_name}, Price: ${price}, Time: ${time}`);

    // Validate inputs
    if (!p_name || isNaN(price)) {
        return res.status(400).json({ error: "Invalid product name or price" });
    }

    // Connect to MongoDB
    const { MongoClient } = require('mongodb');
    const uri = "mongodb+srv://root:lUJeU2iPcFlE53tb@database.gau0z.mongodb.net/?retryWrites=true&w=majority&appName=database";
    const client = new MongoClient(uri);
    const dbName = 'Krispee';
    
    try {
        await client.connect();
        console.log('Connected successfully to server');

        const db = client.db(dbName);
        const collection = db.collection('cart'); // Collection for cart items

        // Delete item selected using a more specific condition (including time_added)
        const result = await collection.deleteOne({ 
            item_name: p_name,
            time_added: time,
            price: price
        });

        console.log('Delete Result:', result);  // Log the result of the delete operation
        
        if (result.deletedCount === 1) {
            console.log('Item successfully deleted');
            return res.status(200).json({ data: "Item successfully deleted" });
        } else {
            console.log('Item not found for deletion');
            return res.status(404).json({ error: "Item not found" });
        }
    } catch (err) {
        console.error('Error deleting item:', err);
        return res.status(500).json({ error: "Failed to delete item" });
    }
}
