import useInputValidator from '@/hooks/useInputValidator';
import videoService from '@/services/videoService';
import React from 'react'

function Share() {

    const urlInput = useInputValidator('', [
        {
            validator: (value) => value ? true : false,
            message: 'URL is required.',
        },
        {
            validator: (value) => {
                if (typeof value === 'string') {
                    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
                    return urlRegex.test(value);
                }
                return false;
            },
            message: 'Please provide a valid URL address',
        },
        {
            validator: (value) => {
                if (typeof value === 'string' && getYouTubeVideoId(value)) {
                    const youtubeRegex = /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/;
                    const youtuBeRegex = /^(https?:\/\/)?(www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})/;
                    // Remove any additional query parameters or fragments
                    const cleanURL = value.split('&')[0].split('#')[0];

                    return youtubeRegex.test(cleanURL) || youtuBeRegex.test(cleanURL);
                }
                return false;
            },
            message: 'Please enter a valid URL of the YouTube video you wish to share.',
        },
    ]);


    const handleOnSubmit = async () => {
        if (urlInput.validate()) {
            const videoId = getYouTubeVideoId(urlInput.value as string);
            if (videoId) {
                const result = await videoService.create(videoId);

                if (result.data.success) {
                    urlInput.clearValue();
                }
            }
        }
    }

    return (
        <div
            className='pt-12'
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 32,
                paddingBottom: 32,
                maxWidth: 996,
                margin: '0 auto',
            }}
        >
            <div
                className='w-2/4 border p-4 relative rounded-md pt-8 pb-8'
            >
                <h2 className='absolute -top-4 pl-1 pr-1 bg-white'>Share a Youtube movie</h2>

                <div className=" flex gap-5 items-center flex-1 ">
                    <label htmlFor="url" className='whitespace-nowrap'>Youtube URL</label>
                    <div className='relative w-full'>
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-700 ">
                            <input
                                type="url"
                                name="url"
                                id="url"
                                className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                value={urlInput.value}
                                onChange={urlInput.handleChange}
                                onKeyUp={() => {
                                    urlInput.validate();
                                }}
                            />
                        </div>
                        {urlInput.error && <p className='absolute top-full text-xs text-red-600'>{urlInput.error}</p>}
                    </div>
                </div>

                <button
                    type="button"
                    className="w-full mt-8 rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                    onClick={handleOnSubmit}
                >
                    Share
                </button>
            </div>
        </div>
    )
}

export default Share

function getYouTubeVideoId(url: string) {
    const regExp = /^(?:https?:\/\/)?(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=|embed\/|v\/|u\/\w\/|embed\/|v=|e\/|r\/|youtube\.com\/watch\?v=|user\/\w+\/|v=)([^#\&\?]{11})/;
    const match = url.match(regExp);
    if (match && match[1]) {
        return match[1];
    } else {
        // Invalid or unsupported YouTube URL
        return null;
    }
}