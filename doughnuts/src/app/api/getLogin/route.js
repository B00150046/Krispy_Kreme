


const { MongoClient, ServerApiVersion } = require('mongodb');

export async function GET(req, res) {

    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')
    const pass = searchParams.get('pass')
    const phone = searchParams.get('phoneNo')
    const uri = "mongodb+srv://root:lUJeU2iPcFlE53tb@database.gau0z.mongodb.net/?retryWrites=true&w=majority&appName=database";
    const client = new MongoClient(uri);
    try{
        await client.connect();
        console.log('Connected to client');
        const db = client.db('Krispee');
        const col = db.collection('users');
        const Resp = await col.find({
            "email": email,
            "password": pass,
            "phoneNo": phone,
            "role": "customer"}).toArray();
        
        console.log(Resp);
        let status = ''
       if(Resp != '') {

        status = 'valid'+'-'+Resp[0].role
       } else {

        status = 'notvalid'
       }


        return Response.json({"status": status});
    }
    catch (err) {
        console.log(err.stack);
    } finally {
        await client.close();
    }

}