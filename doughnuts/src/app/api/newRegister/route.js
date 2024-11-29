export const dynamic = 'forced-dynamic';
const { MongoClient, ServerApiVersion } = require('mongodb');
import { getCustomSession } from '../sessionCode.js'
export async function GET(req, res) {

  let session = await getCustomSession()

  
  const { searchParams } = new URL(req.url)
    // Connect to the Atlas cluster
    const uri = "mongodb+srv://root:lUJeU2iPcFlE53tb@database.gau0z.mongodb.net/?retryWrites=true&w=majority&appName=database";
    const client = new MongoClient(uri);


    console.log('Connecting to client');
    // Connect to the Atlas cluster
    await client.connect();
    // Get the database and collection on which to run the operation
    const db = client.db('Krispee');
    const col = db.collection('users');
    // Create new user, automatically set role to customer
    const name = searchParams.get('name');
    const email = searchParams.get('email');
    const phone = searchParams.get('phone');

    const document = await col.insertOne({     "name": name,      "email": email,      "phone": phone,      "role": "customer"}); // Print results

   

    session.email = email;


    await session.save()
    console.log("data saved")

    
return Response.json({"ok":""})



}