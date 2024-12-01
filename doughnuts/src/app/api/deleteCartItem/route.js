export const dynamic = 'forced-dynamic';

export async function GET(req, res) {
    const { searchParams } = new URL(req.url);
    const p_name = searchParams.get('item_name');
    const price = parseFloat(searchParams.get('price')); // Ensure price is a number
    const time = searchParams.get('time_added');

    // Validate inputs
    if (!p_name || isNaN(price) || !time) {
        return res.status(400).json({ error: "Invalid product name, price, or time" });
    }

    // Parse time into a Date object
    const parsedTime = new Date(time);
    if (isNaN(parsedTime.getTime())) {
        return res.status(400).json({ error: "Invalid time format" });
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

        // Delete item using all three conditions
        const result = await collection.deleteOne({ 
            item_name: p_name,
            price: price,
            time_added: parsedTime
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
    } finally {
        await client.close();
    }
}
