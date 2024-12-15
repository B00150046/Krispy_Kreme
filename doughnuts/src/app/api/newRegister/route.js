const { MongoClient, ServerApiVersion } = require('mongodb');
import { getCustomSession } from '../sessionCode.js'
import sanitizeHtml from 'sanitize-html';
export async function GET(req, res) {
  const session = await getCustomSession();

  
  const { searchParams } = new URL(req.url)
    // Connect to the Atlas cluster
    //let session = await getCustomSession();
    const uri = "mongodb+srv://root:lUJeU2iPcFlE53tb@database.gau0z.mongodb.net/?retryWrites=true&w=majority&appName=database";
    const client = new MongoClient(uri);


    console.log('Connecting to client');
    // Connect to the Atlas cluster
    await client.connect();
    // Get the database and collection on which to run the operation
    const db = client.db('Krispee');
    const col = db.collection('users');
    // Create new user, automatically set role to customer
   
    const email = sanitizeHtml(searchParams.get('email'));
    const password = sanitizeHtml(searchParams.get('password'));
    const phone = sanitizeHtml(searchParams.get('phone'));
 
    console.log('email:', email);
    console.log('password: ', password);
    const validator = require("email-validator");
    const errors = [];
    if (!email || !validator.validate(email)) {
        errors.push("Invalid email address.");
    }
    if (!password || password.length < 8) {
        errors.push("Password must be at least 8 characters long.");
    }
    if (!phone || !/^1-\d{3}-\d{3}$/.test(phone)) {
        errors.push("Phone number must be exactly 1-XXX-XXX.");
    }

    if (errors.length > 0) {
        // Return error response if validation fails
        return Response.json({ errors });
    }
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);

    await col.insertOne({   
      "email": email.trim(),      
      "password": hash, 
      "phone": phone.trim(),      
      "role": "customer"}); // Print results


    
return Response.json({ ok: true, message: "User registered successfully" });



}

