import axios from "axios";
import { BACKEND_BASE_URL } from "../backendUrl";
import { FETCH_VIDEO_FAILURE, FETCH_VIDEO_REQUEST, FETCH_VIDEO_SUCCESS } from "./GetVideoTypes";


export const fetchAllVideos =
    () => async (dispatch) => {
        try {
            dispatch({
                type: FETCH_VIDEO_REQUEST,
            });

            const user_det = await JSON.parse(localStorage.getItem('userInfo'));

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
            };

            const { data } = await axios.get(
                `${BACKEND_BASE_URL}/video/get_videos?token=${user_det.data.token}`,
                config
            );

            dispatch({
                type: FETCH_VIDEO_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: FETCH_VIDEO_FAILURE,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };