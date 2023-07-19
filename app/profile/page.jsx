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
    },[]);

    const fetchUserPrompts = async () => {
        const response = await fetch(`/api/users/${session?.user.id}/prompts`);
        const data = await response.json();

        setPrompts(data);
    }

    const onEdit = async () => {

    }

    const onDelete = async () => {

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