"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

export default function () {
    const router = useRouter();

    const { data: session } = useSession();
    const [prompts, setPrompts] = useState([]);

    useEffect(() => {
        if(session?.user.id) {
            fetchUserPrompts()
        }
    },[session]);

    const fetchUserPrompts = async () => {
        const response = await fetch(`/api/users/${session?.user.id}/prompts`);
        const data = await response.json();

        setPrompts(data);
    }

    const onEdit = async (prompt) => {
        router.push(`/update-prompt?id=${prompt._id}`)
    }

    const onDelete = async (prompt) => {
        try {
            const response = await fetch(`/api/prompt/${prompt._id}`, {
                method: 'DELETE',
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
        <>
            <Profile
                name='My'
                description='Welcome profile'
                data={prompts}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        </>
    )
}