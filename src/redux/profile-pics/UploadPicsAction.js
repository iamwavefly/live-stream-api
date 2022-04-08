import axios from "axios";
import { BACKEND_BASE_URL } from "../backendUrl";
import { UPLOAD_PICS_FAILURE, UPLOAD_PICS_REQUEST, UPLOAD_PICS_SUCCESS } from "./UploadPicsTypes";

export const photoUpload =
  (file_base64) => async (dispatch) => {
    try {
      dispatch({
        type: UPLOAD_PICS_REQUEST
      });

      const user_det = await JSON.parse(localStorage.getItem('userInfo'));
      const token = user_det.data.token
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `${BACKEND_BASE_URL}/account/upload_photo`,
        {token, file_base64},
        config
      );

      dispatch({
        type: UPLOAD_PICS_SUCCESS,
        payload: data,
      });

    } catch (error) {
      dispatch({
        type: UPLOAD_PICS_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };