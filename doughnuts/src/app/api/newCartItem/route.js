export async function GET(req, res) {


    // Make a note we are on
    // the api. This goes to the console.
    console.log("in the putInCart api page")
  
    // get the values
    // that were sent across to us.
  
    const { searchParams } = new URL(req.url)
    const p_name = searchParams.get('pname')
    const price = searchParams.get('price')
    console.log(pname);
  
   // =================================================
  
    const { MongoClient } = require('mongodb');
    const uri = "mongodb+srv://root:lUJeU2iPcFlE53tb@database.gau0z.mongodb.net/?retryWrites=true&w=majority&appName=database";
    const client = new MongoClient(uri);
    const dbName = 'database'; // database name
  
    await client.connect();
  
    console.log('Connected successfully to server');
  
    const db = client.db(dbName);
    const collection = db.collection('cart'); // collection name

    const document = await col.insertOne({     
        "item_name": p_name,      
        "price": price,      
       
        }); // Print results

  
  
  
   //==========================================================
  

  
    // at the end of the process we need to send something back.
  
    return Response.json({ "data":"" + "inserted" + ""})
  
  }
  
  
  