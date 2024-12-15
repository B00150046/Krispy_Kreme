import { getCustomSession } from "../sessionCode.js";


export async function GET(req, res) {

  let session = await getCustomSession();
 // const searchParams
  
  let email = session.email;

  console.log(email);

  let valid = false;
  if(email){

    valid = true;
  }
  return Response.json({"data": valid});

}

