import VideoItem from "@/components/VideoItem"
import videoService, { IResponseVideoAll, IVideo } from "@/services/videoService";
import React from "react";

export interface HomeProps { }



export const Home: React.FC<HomeProps> = () => {

    const [videos, setVideos] = React.useState<Array<IVideo>>([]);

    const [paginate, setPaginate] = React.useState<Omit<IResponseVideoAll, 'data'>>({
        currentPage: 1,
        pageSize: 5,
        totalPages: 0,
    });

    const handleOnChangepage = (page: number) => () => {
        onloadVideos({
            currentPage: page,
            pageSize: paginate.pageSize
        })
    }

    const onloadVideos = async (pagination: {
        currentPage: number,
        pageSize: number,
    }) => {
        const videosData = await videoService.getAll({
            currentPage: pagination.currentPage.toString(),
            pageSize: pagination.pageSize.toString(),
        });
        if (videosData) {
            setVideos(videosData.data);
            setPaginate({
                ...videosData
            });
        }
    }

    React.useEffect(() => {
        onloadVideos({
            currentPage: paginate.currentPage,
            pageSize: paginate.pageSize
        })
    }, []);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 32,
                paddingTop: 32,
                paddingBottom: 32,
                maxWidth: 996,
                margin: '0 auto',
            }}
        >
            {
                videos.map((item) => (
                    <VideoItem video={item} key={item._id} />
                ))
            }
            {
                paginate.totalPages ?
                    <nav aria-label="Page navigation example">
                        <ul className="inline-flex -space-x-px text-sm">
                            <li>
                                <a
                                    href="javascript:void(0)"
                                    onClick={() => {
                                        if (paginate.currentPage > 1) {
                                            handleOnChangepage(paginate.currentPage - 1)();
                                        }
                                    }}
                                    className={'flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white' + (paginate.currentPage === 1 ? ' cursor-no-drop opacity-70  ' : '')}>Previous</a>
                            </li>
                            {
                                [...Array(paginate.totalPages)].map((_, index) => (
                                    <li key={index}>
                                        <a
                                            href="javascript:void(0)"
                                            onClick={handleOnChangepage((index + 1))} aria-current="page" className={"flex items-center justify-center px-3 h-8 border border-gray-300  hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white" + (paginate.currentPage === (index + 1) ? ' bg-blue-50 text-blue-600 ' : '')}>{index + 1}</a>
                                    </li>
                                ))
                            }
                            <li>
                                <a
                                    href="javascript:void(0)"
                                    onClick={() => {
                                        if (paginate.currentPage < paginate.totalPages) {
                                            handleOnChangepage(paginate.currentPage + 1)();
                                        }
                                    }}
                                    className={"flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" + (paginate.currentPage === paginate.totalPages ? ' cursor-no-drop opacity-70 ' : '')}>Next</a>
                            </li>
                        </ul>
                    </nav>
                    : null
            }

        </div>
    )
}

export default Home
