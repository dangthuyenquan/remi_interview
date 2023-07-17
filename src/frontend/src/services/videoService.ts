import { IUser } from "@/stores/authReducer";
import axios from "axios";

const videoService = {
    getAll: async function getAll(pagination: { pageSize: string, currentPage: string }): Promise<IResponseVideoAll | null> {
        const result = await axios.get('/video?' + (new URLSearchParams(pagination).toString()));

        if (result.data) {
            return result.data as IResponseVideoAll;
        }

        return null;
    },

    create: async function (videoYoutubeId: string) {
        return await axios.post('/video', { videoYoutubeId });
    }

}

export default videoService;

export interface IVideo {
    _id: string,
    videoYoutubeId: string,
    title: string,
    description: string,
    shareBy: IUser
}

export interface IResponseVideoAll {
    currentPage: number,
    pageSize: number,
    totalPages: number,
    data: Array<IVideo>
}