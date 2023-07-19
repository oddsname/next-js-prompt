import Prompt from "@models/prompt";
import {connectDB} from "@utils/database";

export const GET = async (req, { params }) => {
    try {
        await connectDB();

        const prompts = await Prompt.find({ user_id: params.id }).populate('user_id');

        return new Response(JSON.stringify(prompts), { status: 200});
    } catch (err) {
        return new Response("Something went wrong, ERROR: " + err.message, { status: 500});
    }
}
