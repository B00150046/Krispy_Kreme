import { getIronSession } from 'iron-session';

import { cookies } from 'next/headers'


export async function getCustomSession(){



    console.log("loading session stuff")

    let pw = "VIi8pH38vD8ZLgEZclSa7an3olx4pkh6pvBj9fGZf"
    const cookieStore = await cookies();
    const session = await getIronSession(cookieStore, {
        password: pw,
        cookieName: "app"
    });
    console.log('Session from IronSession:', session);
    console.log('Email in session:', session.email);

   

    return session


}

