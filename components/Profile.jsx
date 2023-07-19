import PromptCardList from "@components/PrompCardList";

export default function Profile({ name, description, data, onEdit, onDelete}) {

    return (
        <section className='w-full'>
            <h1 className='head_text text-left'>
                <span className='blue_gradient'>{name} Profile</span>
            </h1>
            <p className='desc text-left'>{description}</p>

            <div>
                <PromptCardList
                    data={data}
                    onDelete={() => {}}
                    onEdit={() => {}}
                />
            </div>

        </section>
    );
}