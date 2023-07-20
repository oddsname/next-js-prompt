"use client"
import {useState, useEffect} from "react";
import PromptCardList from "@components/PrompCardList";
import {debounce} from "@utils/debounce";

export default function Feed() {
    const [searchText, setSearchText] = useState('');
    const [prompts, setPrompts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchPrompts()
    },[]);

    useEffect(() => {
        setLoading(true);
        debounce(async () => {
            await fetchPrompts(searchText);
            setLoading(false);
        }, 300)
    }, [searchText])

    const fetchPrompts = async (text = null) => {
        const url = text
            ? `/api/prompt?text=${text}`
            : '/api/prompt'

        const response = await fetch(url);
        const data = await response.json();

        setPrompts(data);
    }

    const onSearchChange = async (e) => {
        setSearchText(e.target.value);
    }

    const onTagClick = async (prompt) => {
       setSearchText(prompt.tag);
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

            { loading
                ? <div className='mt-16'>...Loading</div>
                :  <PromptCardList
                    data={prompts}
                    onTagClick={onTagClick}
                    showButtons={false}
                />
            }

        </section>
    );
}