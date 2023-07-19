"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function PromptCard({ prompt, onTagClick, onEdit, onDelete }) {
    const [copied, setCopied] = useState('');
    const { data: session } = useSession();

    const getIcon = () => {
        return prompt.prompt === copied ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'
    }

    const onCopyClick = () => {
        setCopied(prompt.prompt);
        navigator.clipboard.writeText(prompt.prompt);

        setTimeout(() => {
            setCopied('')
        }, 3000)
    }

    const renderButtons = () => {
        if(session?.user.id !== prompt.user_id._id) {
            return '';
        }

        return (
            <div className='mg-5 flex-center gap-4 border-t border-gray-100 pt-3'>
                <p className='text-sm green_gradient cursor-pointer' onClick={() => onEdit(prompt)}>
                    Edit
                </p>
                <p className='text-sm orange_gradient cursor-pointer' onClick={() => onDelete(prompt)}>
                    Delete
                </p>
            </div>
        );
    }

    return (
        <div className='prompt_card'>
            <div className='flex justify-between items-start gap-5'>
                <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
                    <Image src={prompt.user_id.image} alt="user_image" width={40} height={40} className='rounded-full object-contain' />

                    <div className='flex flex-col'>
                        <h3 className='text-gray-900'>{prompt.user_id.username}</h3>
                        <p className='text-sm text-gray-500' >{prompt.user_id.email}</p>
                    </div>
                </div>

                <div className='copy_btn' onClick={onCopyClick}>
                    <Image src={ getIcon() } width={12} height={12} alt='copy btn'/>
                </div>
            </div>

            <p className='my-4 text-sm text-gray-700'>{prompt.prompt}</p>
            <p className='text-sm blue_gradient cursor-pointer' onClick={() => onTagClick && onTagClick(prompt)}>#{prompt.tag}</p>

            { renderButtons() }
        </div>
    );
}