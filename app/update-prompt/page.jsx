"use client";

import {useEffect, useState} from "react";
import { useSession } from "next-auth/react";
import {useRouter, useSearchParams} from "next/navigation";

import PromptForm from "@components/PromptForm"

export default function editPrompt() {
    const router = useRouter();

    const [prompt, setPrompt] = useState({
        prompt: '',
        tag: '',
    })

    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    useEffect(() => {
        getPrompt(promptId)
    }, [promptId]);

    const [loading, setLoading] = useState(false);

    const description = 'Create and share amazing prompts with the world, and let your imagination run wild with any AI-powered platform';

    const getPrompt = async (id) => {
        try {
            const response = await fetch(`/api/prompt/${id}`)

            if (response.ok) {
                setPrompt(await response.json());
            } else {
                throw new Error(response);
            }
        } catch (e) {
            console.log(e);
        }
    }

    const editPrompt = async (e, id) => {
        e.preventDefault();

        setLoading(true);

        try {
            const response = await fetch(`/api/prompt/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    ...prompt
                })
            })

            if(response.ok) {
                await router.push('/');
            } else {
                throw new Error(response);
            }
            setLoading(false);
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
            handleSubmit={(e) => editPrompt(e, promptId)}
        />
    )
}