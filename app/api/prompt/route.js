import Prompt from "@models/prompt";
import {connectDB} from "@utils/database";

export const GET = async (req) => {
    try {
        await connectDB();

        const {searchParams} = new URL(req.url)
        const text = searchParams.get('text');

        let filters = {};

        if (text) {
            filters = {
                $or: [
                    {prompt: {$regex: text}},
                    {tag: {$regex: text}},
                ]
            };
        }

        const prompts = await Prompt.find(filters).populate('author');

        return new Response(JSON.stringify(prompts), {status: 200});
    } catch (err) {
        return new Response("Something went wrong, ERROR: " + err.message, {status: 500});
    }
}
