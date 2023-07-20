
import Prompt from "@models/prompt";
import {connectDB} from "@utils/database";

export const GET = async (req) => {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url)
        const text = searchParams.get('sdsa');

        return new Response(JSON.stringify([]), { status: 200});
    } catch (err) {
        return new Response("Something went wrong, ERROR: " + err.message, { status: 500});
    }
}
