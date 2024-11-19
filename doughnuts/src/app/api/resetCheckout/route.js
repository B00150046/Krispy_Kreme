export async function GET(req, res) {
    const uri = "mongodb+srv://user:Password456*@database.gau0z.mongodb.net/?retryWrites=true&w=majority&appName=database";
    const client = new MongoClient(uri);
    const dbName = 'database'; // database name
  
    await client.connect();
  
    console.log('Connected successfully to server');
  
    const db = client.db(dbName);
    const collection = db.collection('cart'); // collection name
    const cartItems = await collection.find({}).toArray();


    //Delete all items in cart collection
    
    //Move said items to order collection
    const orderCollection = db.collection('order');

    const deleteResult = await collection.deleteMany({});
    console.log('Deleted ' + deleteResult.deletedCount + ' documents');

   
}
