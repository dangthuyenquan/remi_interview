import { IUser } from "@/stores/authReducer";
import axios from "axios";

export async function loginRegister(user: string, pwd: string) {
    const result = await axios.post('/register', {
        user,
        pwd
    });
    if (result?.data.accessToken as string) {
        return result?.data.accessToken as string;
    }

    return null;
}

export function logoutAccout() {
    axios.get('/logout');
    return true;
}

export async function getInfoAccount(): Promise<IUser | null> {
    const result = await axios.get('/info-account').catch(error => {
        return error.response;
    });
    return result.data as IUser;
}