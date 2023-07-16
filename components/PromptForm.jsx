import Link from "next/link";

export default function PromptForm({handleSubmit, data, setData, header, description, loading}) {

    const renderHeader = () => {
        if (!header) {
            return '';
        }

        return (
            <>
                <h1 className='head_text text-center'>
                    <span className='blue_gradient'>{header}</span>
                </h1>

                {description && <p className='desc text-center max-w-md'>{description}</p>}
            </>
        )
    }

    return (
        <form
            onSubmit={(e) => handleSubmit(e)}
            className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
        >
            {renderHeader()}

            <label>
                <span className='font-bold text-gray-700'>Your AI-prompt</span>

                <textarea
                    value={data.prompt}
                    onChange={(e) => setData({...data, prompt: e.target.value })}
                    placeholder='Write your prompt here...'
                    required
                    className='form_textarea'
                />
            </label>

            <label>
                <span className='font-bold text-gray-700'>Tag</span>
                <span className='text-base text-gray-700'> (#product, #webdevelopment, #idea)</span>

                <input
                    value={data.tag}
                    onChange={(e) => setData({...data, tag: e.target.value })}
                    placeholder='#tag'
                    required
                    className='form_input'
                />
            </label>

            <div className='flex-end mx-3 mb-5 gap-4'>
                <Link href='/' className='font-bold text-gray-700'>
                    Cancel
                </Link>

                <button
                    type='submit'
                    disabled={loading}
                    className='px-5 py-1.5 font-bold text-sm bg-orange-500 rounded-full text-white'
                >
                    { loading ? 'Saving...' : 'Save'}
                </button>
            </div>
        </form>
    );
}