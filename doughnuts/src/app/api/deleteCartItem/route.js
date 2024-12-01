export async function GET(req, res) {
    try {
        const { searchParams } = new URL(req.url);
        const p_name = searchParams.get('item_name');
        const price = parseFloat(searchParams.get('price'));
        const time_added = searchParams.get('time_added');

        // Validate inputs
        if (!p_name || isNaN(price) || !time_added) {
            return res.status(400).json({ error: "Invalid request parameters" });
        }

        const parsedTime = new Date(time_added);
        if (isNaN(parsedTime.getTime())) {
            return res.status(400).json({ error: "Invalid time format" });
        }

        // Connect to MongoDB
        const { MongoClient } = require('mongodb');
        const uri = "mongodb+srv://root:lUJeU2iPcFlE53tb@database.gau0z.mongodb.net/?retryWrites=true&w=majority&appName=database";
        const client = new MongoClient(uri);
        const dbName = 'Krispee';

        await client.connect();
        console.log('Connected successfully to server');

        const db = client.db(dbName);
        const collection = db.collection('cart');

        // Delete the specified cart item
        const result = await collection.deleteOne({
            item_name: p_name,
            price: price,
            time_added: parsedTime.toISOString()
        });

        if (result.deletedCount === 1) {
            return res.status(200).json({ data: "Item successfully deleted" });
        } else {
            return res.status(404).json({ error: "Item not found" });
        }
    } catch (error) {
        console.error("Error deleting item:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
