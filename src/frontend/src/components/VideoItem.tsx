import { IVideo } from '@/services/videoService'
import React from 'react'

function VideoItem({ video }: { video: IVideo }) {
    return (
        <div
            className='flex md:flex-row flex-col gap-8 w-full p-6'
        >
            <div
                className='w-full h-64 md:h-auto md:w-5/12'
            >
                <div
                    style={{
                        position: 'relative',
                        overflow: 'hidden',
                        width: '100%',
                        paddingTop: '56.25%',
                    }}
                >
                    <iframe style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        width: '100%',
                        height: '100%',
                        borderRadius: 8
                    }} src={"https://www.youtube.com/embed/" + video.videoYoutubeId} title="YouTube video player" allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
                </div>
            </div>
            <div
                className='md:w-full xl:w-7/12'
            >
                <h2 className='text-base font-semibold text-lg font-bold text-red-500'>{video.title}</h2>
                <h3 className='mt-1 text-lg text-gray-900'>Shared by {video.shareBy.email}</h3>
                <h4 className='mt-2 text-sm text-gray-900' >Description</h4>
                <p className='text-md text-gray-600 line-clamp-6'>{video.description}</p>
            </div>
        </div >
    )
}

export default VideoItem