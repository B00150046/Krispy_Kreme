import { getCustomSession } from '../sessionCode.js'
export const dynamic = 'forced-dynamic';
export async function GET(req, res) {
 let session = await getCustomSession()



  session.role = 'customer' // setting the persons role into the session
  session.email = ''

  await session.save()
  console.log("data saved")
  return Response.json({})

}