"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import {useRouter} from "next/navigation";

import PromptForm from "@components/PromptForm"

export default function createPrompt() {
    const router = useRouter();

    const { data: session } = useSession();
    const [prompt, setPrompt] = useState({
        prompt: '',
        tag: '',
    })

    const [loading, setLoading] = useState(false);

    const description = 'Create and share amazing prompts with the world, and let your imagination run wild with any AI-powered platform';

    const createPrompt = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const response = await fetch('/api/prompt/create', {
                method: 'POST',
                body: JSON.stringify({
                    data: prompt,
                    userId: session.user.id
                })
            })

            if(response.ok) {
                await router.push('/');
            } else {
                throw new Error(response);
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <PromptForm
            header='Create Post'
            description={description}
            data={prompt}
            setData={setPrompt}
            loading={loading}
            handleSubmit={createPrompt}
        />
    )
}