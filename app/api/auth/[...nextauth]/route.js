import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {connectDB} from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        })
    ],
    callbacks: {
        async session({session}) {
            const sessionUser = await User.findOne({
                email: session.user.email,
            });

            console.log(sessionUser);

            if(sessionUser) {
                session.user.id = sessionUser._id.toString();

                return session;
            }

            return '';
        },
        async signIn({profile}) {
            try {
                await connectDB();

                //check if user already exist
                const user = await User.findOne({
                    email: profile.email
                });

                //if not, create new user
                if (!user) {
                    console.log('start create');
                    await User.create({
                        email: profile.email,
                        username: profile.name,
                        image: profile.picture,
                    });
                }

                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }

})

export {handler as GET, handler as POST};