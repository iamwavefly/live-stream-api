import axios from "axios";
import { BACKEND_BASE_URL } from "../backendUrl";
import { UPLOAD_VIDEO_FAILURE, UPLOAD_VIDEO_REQUEST, UPLOAD_VIDEO_SUCCESS } from "./VideoTypes";

export const videoUpload =
  (file_base64 ) => async (dispatch) => {
    try {
      dispatch({
        type: UPLOAD_VIDEO_REQUEST
      });

      const user_det = await JSON.parse(localStorage.getItem('userInfo'));
      const token = user_det.data.token
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      //   console.log(token, file_base64)
      const { data } = await axios.post(
        `${BACKEND_BASE_URL}/video/upload_video`,
        { token, file_base64 },
        config
      );

      dispatch({
        type: UPLOAD_VIDEO_SUCCESS,
        payload: data,
      });

      //   dispatch({
      //     type: USER_LOGIN_SUCCESS,
      //     payload: data,
      //   });

      // localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      console.log(error)
      dispatch({
        type: UPLOAD_VIDEO_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };