import Prompt from "@models/prompt";
import {connectDB} from "@utils/database";

export const GET = async (req, {params}) => {
    try {
        await connectDB();

        const prompt = await Prompt.findById(params.id).populate('user_id');

        if (prompt) {
            return new Response("Not found", {status: 404});
        }

        return new Response(JSON.stringify(prompt), {status: 200});
    } catch (err) {
        return new Response("Something went wrong, ERROR: " + err.message, {status: 500});
    }
}

export const PATCH = async (req, { params }) => {
    try {
        await connectDB();

        const {prompt, tag} = await req.json();

        const existingPrompt = await Prompt.findOne(params.id).populate('user_id');

        if (existingPrompt) {
            return new Response("Not found", {status: 404});
        }

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), {status: 200});
    } catch (err) {
        return new Response("Something went wrong, ERROR: " + err.message, {status: 500});
    }
}


export const DELETE = async (req, { params }) => {
    try {
        await connectDB();
        const prompt = await Prompt.deleteOne(params.id)

        return new Response(JSON.stringify(prompt), {status: 200});
    } catch (err) {
        return new Response("Something went wrong, ERROR: " + err.message, {status: 500});
    }
}
