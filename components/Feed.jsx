"use client"
import { useState, useEffect } from "react";
import PromptCard from "@components/PromptCard";
import PromptCardList from "@components/PrompCardList";

export default function Feed() {
    const [searchText, setSearchText] = useState('');
    const [prompts, setPrompts] = useState([]);

    useEffect(() => {
        fetchPrompts()
    },[]);

    const fetchPrompts = async () => {
        const response = await fetch('/api/prompt');
        const data = await response.json();

        setPrompts(data);
    }

    const onSearchChange = (e) => {
        setSearchText(e.target.value);
    }

    return (
        <section className='feed'>
            <form className='relative w-full flex-center'>
                <input
                    type='text'
                    placeholder='Search for a tag or username'
                    value={searchText}
                    onChange={onSearchChange}
                    required
                    className='search_input peer'
                />
            </form>

            <PromptCardList
                data={prompts}
                onTagClick={() => {}}
                showButtons={false}
            />
        </section>
    );
}