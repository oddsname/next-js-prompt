import PromptCard from "@components/PromptCard";

export default function PromptCardList({ data, onTagClick, onDelete, onEdit }) {

    return (
        <div className='mt-16 prompt_layout'>
            {data.map((prompt) =>
                <PromptCard
                    key={prompt._id}
                    prompt={prompt}
                    onTagClick={() => onTagClick && onTagClick(prompt)}
                    onDelete={() => onDelete && onDelete(prompt)}
                    onEdit={() => onEdit && onEdit(prompt)}
                />
            )}
        </div>
    );
}