import PromptCard from "@components/PromptCard";

export default function PromptCardList({ data, onTagClick }) {

    return (
        <div className='mt-16 prompt_layout'>
            {data.map((prompt) =>
                <PromptCard
                    key={prompt._id}
                    prompt={prompt}
                    onTagClick={onTagClick}
                />
            )}
        </div>
    );
}