
const { MongoClient, ServerApiVersion } = require('mongodb');
import { getCustomSession } from '../sessionCode.js'
export const dynamic = 'forced-dynamic';
export async function GET(req, res) {
    let session = await getCustomSession()

    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')
    const pass = searchParams.get('password')
    const uri = process.env.DB_ADDRESS
    const client = new MongoClient(uri);
   
        await client.connect();
        console.log('Connected to client');
        const db = client.db('Krispee');
        const col = db.collection('users');
        const Resp = await col.find({"email": email,"password": pass}).toArray();

        
        console.log(Resp[0]);


        
        let status = ''
       if(Resp[0].role != 'customer') {

        status = 'novalid'+'-'+Resp[0].role
       } else {

        status = 'valid'
       }
       session.email = email;

       await session.save()
       console.log("data saved")

        return Response.json({"status": status});
    }
    

