import axios from "axios";
import { BACKEND_BASE_URL } from "../backendUrl";
import { UPDATE_PASSWORD_FAILURE, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS } from "./UpdatePasswordTypes";


export const changePass =
  (oldPassword, newPassword, newPassword2) => async (dispatch) => {
      
    try {
      dispatch({
        type: UPDATE_PASSWORD_REQUEST
      });

      const user_det = await JSON.parse(localStorage.getItem('userInfo'));
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer "+user_det.token
        },
      };

      const { data } = await axios.put(
        `${BACKEND_BASE_URL}/user/update/password`,
        { oldPassword, newPassword, newPassword2 },
        config
      );

      dispatch({
        type: UPDATE_PASSWORD_SUCCESS,
        payload: data,
      });
      console.log(data)
      

    //   dispatch({
    //     type: USER_LOGIN_SUCCESS,
    //     payload: data,
    //   });

      // localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      console.log(error)
      dispatch({
        type: UPDATE_PASSWORD_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };