const { MongoClient, ServerApiVersion } = require('mongodb');

export async function GET(req, res) {


  async function run (req, res) {
  try {
    // Connect to the Atlas cluster
    const uri = "mongodb+srv://user:Password456*@database.gau0z.mongodb.net/?retryWrites=true&w=majority&appName=database";
    const client = new MongoClient(uri);
    console.log('Connecting to client');
    // Connect to the Atlas cluster
    await client.connect();
    // Get the database and collection on which to run the operation
    const db = client.db('Krispee');
    const col = db.collection('users');
    // Create new user, automatically set role to customer
    const email = searchParams('email');
    const password = searchParams('password');
    const phone = searchParams('phoneNo');

    const userDocuments = [{
      email: email,
        password: password,
        phoneNo: phone,
        role: 'customer',
   
    }]; // Insert the documents into the specified collection
    const document = await col.insertOne(userDocuments); // Print results

    console.log('Document found:\n' + JSON.stringify(document));
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}
run()
return Response.json({"ok":""})



}