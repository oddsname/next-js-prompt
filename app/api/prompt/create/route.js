import { connectDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req, res) => {
    const {userId, data} = await req.json();

    try {
        await connectDB();

        const newPrompt = new Prompt({
            user_id: userId,
            prompt: data.prompt,
            tag: data.tag,
        });

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), {status: 201 })
    } catch (e) {
        return new Response("Failed to created, message: " + e.message, { status: 400 });
    }
}