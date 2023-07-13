import React from 'react'

function VideoItem() {
    return (
        <div
            style={{
                display: 'flex',
                gap: 32,
                justifyItems: 'flex-start',
            }}
        >
            <div
                style={{ flex: 5 }}
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
                    }} src="https://www.youtube.com/embed/9zaloHhqi6Y" title="YouTube video player" allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
                </div>
            </div>
            <div
                style={{
                    flex: 6
                }}
            >
                <h2 className='text-base font-semibold text-lg font-bold text-red-500'>Video Title</h2>
                <h3 className='mt-1 text-lg text-gray-900'>Shared by dangthuyenquan@gmail.com</h3>
                <h4 className='mt-2 text-sm text-gray-900' >Description</h4>
                <p className='text-md text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto alias asperiores perspiciatis, rem eos totam facere obcaecati beatae repellendus mollitia ipsam? Possimus tempora assumenda inventore corrupti sunt tenetur porro ipsa.</p>
            </div>
        </div >
    )
}

export default VideoItem