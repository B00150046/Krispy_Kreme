const { MongoClient } = require('mongodb');
import sanitizeHtml from 'sanitize-html';
import { getCustomSession } from '../sessionCode.js';

export async function GET(req, res) {
        const session = await getCustomSession();

        // Sanitize input from query parameters
        const { searchParams } = new URL(req.url);
        const email = sanitizeHtml(searchParams.get('email'));
        const pass = sanitizeHtml(searchParams.get('password'));

        // MongoDB connection
        const uri = "mongodb+srv://root:lUJeU2iPcFlE53tb@database.gau0z.mongodb.net/?retryWrites=true&w=majority&appName=database";
        const client = new MongoClient(uri);

        await client.connect();
        console.log('Connected to client');

        const db = client.db('Krispee');
        const col = db.collection('users');

        // Query only by email
        const user = await col.findOne({ email });
        console.log('Found user:', user);
        const errors = [];
        if (!user) {
            console.error('User not found for email:', email);
            errors.push('Invalid email');
        }
    
        // Compare the plain text password with the stored hash
        const bcrypt = require('bcrypt');
        const hashResult = bcrypt.compareSync(pass, user.password);
        
        if (!hashResult) {
            console.error('Password mismatch for password:', pass);
            errors.push('Invalid  password');
        }

    
        if (errors.length > 0) {
            // Return error response if validation fails
            return Response.json({ errors });
        }
        // If password matches, check role and save session
        let status;
        if (!user.role) {
            status = 'novalid';
        } else {
            status = `valid`;
            session.email = email;
            session.role = user.role;
            await session.save();
            console.log('Session saved for email:', email);
            console.log('Session saved for role:', user.role);
        }

        // Return successful status
        return Response.json({ status: status, role: user.role });
    
}
