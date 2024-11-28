import { getCustomSession } from "../sessionCode.js";


export async function GET(req, res) {

  let session = await getCustomSession();
 // const searchParams
 

   session.destroy()
 return Response.json({});

}

