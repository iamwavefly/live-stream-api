/* eslint-disable no-unused-vars */
import axios from "axios";
import { BACKEND_BASE_URL } from "../backendUrl";
import { CREATE_SCHEDULE_FAILURE, CREATE_SCHEDULE_REQUEST, CREATE_SCHEDULE_SUCCESS, FETCH_SCHEDULE_FAILURE, FETCH_SCHEDULE_REQUEST, FETCH_SCHEDULE_SUCCESS } from "./ScheduleTypes";

export const newSchedule =
  (token, video_id, title, date, time, tags, description, is_instagram, is_twitter, is_facebook, is_youtube, is_twitch) => async (dispatch) => {
    try {
      dispatch({
        type: CREATE_SCHEDULE_REQUEST
      });

      const user_det = await JSON.parse(localStorage.getItem('userInfo'));
      // const token = user_det.data.token
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      };

      //   console.log(token, file_base64)
      const { data } = await axios.put(
        `${BACKEND_BASE_URL}/video/schedule_video`,
        { token, video_id, title, date, time, tags, description, is_instagram, is_twitter, is_facebook, is_youtube, is_twitch },
        config
      );

      dispatch({
        type: CREATE_SCHEDULE_SUCCESS,
        payload: data,
      });

    } catch (error) {
      console.log(error)
      dispatch({
        type: CREATE_SCHEDULE_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };



  export const fetchAllSchedules =
    () => async (dispatch) => {
        try {
            dispatch({
                type: FETCH_SCHEDULE_REQUEST,
            });

            const user_det = await JSON.parse(localStorage.getItem('userInfo'));
            // console.log(user_det)

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
            };

            const { data } = await axios.get(
                `${BACKEND_BASE_URL}/video/get_scheduled_video?token=${user_det.data.token}`,
                config
            );
            // console.log(data)

            dispatch({
                type: FETCH_SCHEDULE_SUCCESS,
                payload: data,
            });
        } catch (error) {
            console.log(error)
            dispatch({
                type: FETCH_SCHEDULE_FAILURE,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };