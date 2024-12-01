//This is supposed to delete everything on cart table and movie it to orders table with the current sessions email added to it, it also sends an email confirmining your purchase
//import { resetCart} from '../../route.js'
//mlsn.09177e0f860d9743df1644ed424ef6eee0ef50aa5ede162659fc84b37c40b75c bnh
export const dynamic = 'forced-dynamic';
import { getCustomSession } from "../sessionCode";
export async function GET(req, res) {
    //get email address from current session
    const session = req.session;
    const nuEmail = session.email;
    if (!nuEmail){
        return res.json({"error":"no email"})
    }

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

    // Format email body
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

    // Send email
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

    // Move cart items to orders
    await Promise.all(
      cartItems.map((item) =>
        orders.insertOne({
          p_name: item.p_name,
          price: item.price,
          email: nuEmail,
        })
      )
    );

    // Clear cart and destroy session
    await cart.deleteMany({});
    session.destroy();

    await client.close();

    return res.status(200).json({ message: "Receipt sent and order processed" });
 
  }

