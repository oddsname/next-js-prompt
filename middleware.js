import {connectDB} from "@utils/database";

export async function middleware(req, res) {
    console.log('middleware')
}

export const config = {
    matcher: '/api/:any*',
}
