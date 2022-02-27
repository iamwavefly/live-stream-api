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

    //   console.log(token, file_base64)
      const { data } = await axios.put(
        `${BACKEND_BASE_URL}/account/upload_photo`,
        {token, file_base64},
        config
      );
      console.log(data)

      dispatch({
        type: UPLOAD_PICS_SUCCESS,
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
        type: UPLOAD_PICS_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };