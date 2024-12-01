export default async function POST(req, res) {
    try {
        // Get email address from current session
        const session = await getCustomSession(req);
        const nuEmail = session.email;

        // MongoDB client setup
        const uri = "mongodb+srv://root:lUJeU2iPcFlE53tb@database.gau0z.mongodb.net/?retryWrites=true&w=majority&appName=database";
        const client = new MongoClient(uri);
        await client.connect();

        const db = client.db("Krispee");
        const cart = db.collection("cart");
        const orders = db.collection("orders");

        // Fetch cart items filtered by email
        const cartItems = await cart.find({ email: nuEmail }).toArray();
        if (!cartItems.length) {
            return res.status(400).json({ error: "Cart is empty" });
        }

        // Format cart items for email
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

        // Send email via MailerSend
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

        // Insert cart items into orders collection
        await Promise.all(
            cartItems.map((item) =>
                orders.insertOne({
                    p_name: item.p_name,
                    price: item.price,
                    email: nuEmail,
                    orderDate: new Date(), // Add timestamp
                })
            )
        );

        // Delete cart items
        await cart.deleteMany({ email: nuEmail });

        // Destroy session
        session.destroy();

        // Close MongoDB client
        await client.close();

        return res.status(200).json({ message: "Receipt sent and order processed" });
    } catch (error) {
        console.error("Error processing order:", error);
        return res.status(500).json({ error: "Failed to process order" });
    }
}
