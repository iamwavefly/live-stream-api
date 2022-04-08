/* eslint-disable no-unused-vars */
import axios from "axios";
import { BACKEND_BASE_URL } from "../backendUrl";
import { CREATE_SCHEDULE_FAILURE, CREATE_SCHEDULE_REQUEST, CREATE_SCHEDULE_SUCCESS, FETCH_SCHEDULE_FAILURE, FETCH_SCHEDULE_REQUEST, FETCH_SCHEDULE_SUCCESS } from "./ScheduleTypes";

export const newSchedule =
  (token, video_id, title, date, time, tags, description, facebook, youtube, twitch) => async (dispatch) => {
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

      const { data } = await axios.put(
        `${BACKEND_BASE_URL}/video/schedule_video`,
        { token, video_id, title, date, time, tags, description, facebook, youtube, twitch },
        config
      );

      dispatch({
        type: CREATE_SCHEDULE_SUCCESS,
        payload: data,
      });

    } catch (error) {
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

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                },
            };

            const { data } = await axios.get(
                `${BACKEND_BASE_URL}/video/get_scheduled_video?token=${user_det.data.token}`,
                config
            );

            dispatch({
                type: FETCH_SCHEDULE_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: FETCH_SCHEDULE_FAILURE,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };