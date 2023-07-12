import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {connectDB} from "@utils/database";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        })
    ],
    async session({ session }) {

    },
    async signIn({ profile }) {
        try {
            await connectDB();

            //check if user already exist

            //if not, create new user
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
})

export { handler as GET, handler as POST };