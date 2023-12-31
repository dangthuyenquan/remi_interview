import axios from 'axios'
import { SnackbarProvider } from 'notistack'
import { Suspense, startTransition, useEffect, useState } from 'react'
import { useLocation, useRoutes } from 'react-router-dom'
import socketIOClient from 'socket.io-client'
import "./App.css"
import { PageWraper } from './assets/style'
import { API_URL, SOCKET_SHARE_VIDEO_APP_URL } from './config'
import SnackbarUtils, { SnackbarUtilsConfigurator } from './config/SnackbarUtils'
import { routers } from './router'
import { getAccessToken, setAccessToken, useAuth } from './stores/authReducer'
import { IVideo } from './services/videoService'

axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;

axios.interceptors.request.use(
    (config) => {
        // Check if the access token exists and is not expired
        const accessToken = getAccessToken();
        if (accessToken) {
            // Add the access token to the request headers
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => {
        if (response.data?.error?.message) {
            SnackbarUtils.toast(response.data.error.message, 'error');
        }

        if (response.data?.success?.message) {
            SnackbarUtils.toast(response.data.success.message, 'success');
        }

        return response;
    },
    (error) => {

        if (error.response?.data?.error?.message) {
            SnackbarUtils.toast(error.response.data.error.message, 'error');
        }

        if (error.response?.data?.success?.message) {
            SnackbarUtils.toast(error.response.data.success.message, 'success');
        }

        const originalRequest = error.config;
        // Check if the response status is 401 (Unauthorized) and if it's the original request


        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // Perform token refresh (e.g., make a request to refresh the token)
            return axios.post('/refresh')
                .then((response) => {
                    const newAccessToken = response.data.accessToken;
                    // Update the access token in local storage

                    setAccessToken(newAccessToken);

                    // Retry the original request with the new access token
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return axios(originalRequest);
                })
                .catch((error) => {
                    // Handle token refresh failure or other errors
                    return Promise.reject(error);
                });
        }
        return Promise.reject(error);
    }
);


function App() {
    const location = useLocation()
    const [displayLocation, setDisplayLocation] = useState(location);

    const auth = useAuth();

    useEffect(() => {
        startTransition(() => {
            setDisplayLocation(location)
        })
    }, [location]);

    useEffect(() => {
        if (auth.isLogin()) {
            const socket = socketIOClient(SOCKET_SHARE_VIDEO_APP_URL);

            // Receive a share-video-channel
            socket.on('share-video-channel', (msg: { video: IVideo }) => {
                if (msg.video._id) {
                    console.log(auth);
                    if (auth.email !== msg.video.shareBy.email) {
                        SnackbarUtils.toast(`${msg.video.shareBy.email} vừa chia sẽ video "${msg.video.title}"`, 'info');
                    }
                }
            });

            // Clean up the socket connection on component unmount
            return () => {
                socket.disconnect();
            };
        }
    }, [auth]);

    const element = useRoutes(routers, displayLocation)

    return (
        <PageWraper>
            <SnackbarProvider>
                <SnackbarUtilsConfigurator />
                <Suspense fallback={<div></div>}>
                    {element}
                </Suspense>
            </SnackbarProvider>
        </PageWraper>
    )
}

export default App
