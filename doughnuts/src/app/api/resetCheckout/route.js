export async function GET(req, res) {
    const uri = "mongodb+srv://root:lUJeU2iPcFlE53tb@database.gau0z.mongodb.net/?retryWrites=true&w=majority&appName=database";
    const client = new MongoClient(uri);
    const dbName = 'database'; // database name
  
    await client.connect();
  
    console.log('Connected successfully to server');
  
    const db = client.db(dbName);
    const oldCollection = db.collection('cart'); // collection name
    const newCollection = db.connection('order');

    const cartItems = await newCollection.find({}).toArray();


    
    //Delete all items in cart collection
    
    //Move said items to order collection
   

    const deleteResult = await oldCollection.deleteMany({});
    console.log('Deleted ' + deleteResult.deletedCount + ' documents');

   
}
