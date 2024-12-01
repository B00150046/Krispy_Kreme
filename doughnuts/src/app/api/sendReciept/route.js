//This is supposed to delete everything on cart table and movie it to orders table with the current sessions email added to it, it also sends an email confirmining your purchase
//import { resetCart} from '../../route.js'
//mlsn.09177e0f860d9743df1644ed424ef6eee0ef50aa5ede162659fc84b37c40b75c bnh

export const dynamic = 'forced-dynamic';
import { MongoClient } from "mongodb";
import { MailerSend, Recipient, EmailParams } from "mailersend";
import { getCustomSession } from "../sessionCode.js";
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed. Use POST instead.' });
    }
try{
    //get email address from current session
    const session = await getCustomSession(req);
    console.log("Session in API:", session); // Debug session content
    if (!session || !session.email) {
        return res.status(401).json({ error: "Unauthorized: No email in session" });
    }
    const nuEmail = session.email;

    const uri = "mongodb+srv://root:lUJeU2iPcFlE53tb@database.gau0z.mongodb.net/?retryWrites=true&w=majority&appName=database";
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db("Krispee");
    const cart = db.collection("cart");
    const orders = db.collection("orders");

    // Fetch cart items
    const cartItems = await cart.find({}).toArray();
    if (!cartItems.length) {
      return res.status(400).json({ error: "Cart is empty" });
    }

   
    const formattedCart = cartItems
    .map((item, i) => `${i + 1}. ${item.p_name} - €${item.price}`)
    .join("\n");

const emailBody = `
    Hello ${nuEmail},

    Thank you for your purchase! Here are the items in your order:

    ${formattedCart}

    Total Items: ${cartItems.length}

    We appreciate your business!
`;

const mailersend = new MailerSend({ apiKey: process.env.MAILERSEND_API_KEY });
const recipient = new Recipient(nuEmail);
const emailParams = new EmailParams()
    .setFrom("info@domain.com")
    .setFromName("Krispy Kreme")
    .setRecipients([recipient])
    .setSubject("Your Order Receipt")
    .setHtml(emailBody.replace(/\n/g, "<br>"))
    .setText(emailBody);

await mailersend.send(emailParams);

await Promise.all(
    cartItems.map((item) =>
        orders.insertOne({
            p_name: item.p_name,
            price: item.price,
            email: nuEmail,
        })
    )
);

await cart.deleteMany({});
session.destroy();

await client.close();
return res.status(200).json({ message: "Receipt sent and order processed" });

} catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
}
}

  




     
       

       


