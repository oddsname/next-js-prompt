import Prompt from "@models/prompt";
import User from "@models/user";
import {connectDB} from "@utils/database";
import { getServerSession} from "next-auth";


export const GET = async (req, {params}) => {
    try {
        await connectDB();

        const prompt = await Prompt.findById(params.id).populate('user_id');

        if (!prompt) {
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

        const existingPrompt = await Prompt.findById(params.id).populate('user_id');

        if (!existingPrompt) {
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
        const session = await getServerSession({req});

        const prompt = await Prompt.findById(params.id).populate('user_id');
        const user = await User.findOne({ email: session?.user?.email });

        if(!prompt) {
            return new Response("Not found", {status: 404});
        }

        if(!user?._id.equals(prompt.user_id._id)) {
            return new Response("Not Allowed", {status: 401});
        }

        await prompt.deleteOne();

        return new Response('', {status: 200});
    } catch (err) {
        return new Response("Something went wrong, ERROR: " + err.message, {status: 500});
    }
}
