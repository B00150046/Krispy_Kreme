//This is supposed to delete everything on cart table and movie it to orders table with the current sessions email added to it, it also sends an email confirmining your purchase
//import { resetCart} from '../../route.js'
//mlsn.09177e0f860d9743df1644ed424ef6eee0ef50aa5ede162659fc84b37c40b75c bnh
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
    const db = client.db('Krispee');
    const cart = db.collection('cart');
    const orders = db.collection('orders');

    //get all items in cart
    const cartItems = await cart.find({}).toArray();

    //add all items to orders
    const formattedCart = cartItems.map((item, i) =>
        `${i + 1}. ${item.p_name} - €${item.price}`).join("\n");

    const emailBody = `
        Hello ${email},
        
        Thank you for your purchase! Here are the items in your order:
        
        ${formattedCart}
        
        Total Items: ${cartItems.length}
        
        We appreciate your business!
    `;

    // Step 5: Send email using MailerSend
    const mailersend = new MailerSend({
        apiKey: "mlsn.09177e0f860d9743df1644ed424ef6eee0ef50aa5ede162659fc84b37c40b75c",
    });

const Reci = require("mailersend").Recipient;
const EmailParams = require("mailersend").EmailParams;
const MailerSend = require("mailersend");

const emailParams = new EmailParams()
    .setFrom("info@domain.com")
    .setFromName("Your Name")
    .setRecipients(Reci)
    .setSubject("Subject")
    .setHtml(emailBody)
    .setText(emailBody.replace(/\n/g, "<br>"));

await mailersend.send(emailParams);

//Move all items from cart to orders with email from session
await Promise.all(cartItems.map(async (item) => {
    await orders.insertOne({
        p_name: item.p_name,
        price: item.price,
        email: nuEmail
    });
}));
await cart.deleteMany({});

session.destroy()
await client.close();
}