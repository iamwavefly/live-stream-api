import axios from "axios";
import { BACKEND_BASE_URL } from "../backendUrl";
import { UPDATE_PASSWORD_FAILURE, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS } from "./UpdatePasswordTypes";


export const changePass =
  (password, new_password, confirm_password) => async (dispatch) => {
      
    try {
      dispatch({
        type: UPDATE_PASSWORD_REQUEST
      });

      const user_det = await JSON.parse(localStorage.getItem('userInfo'));
      const token = user_det.data.token
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(
        `${BACKEND_BASE_URL}/account/change_password`,
        {token, password, new_password, confirm_password },
        config
      );

      dispatch({
        type: UPDATE_PASSWORD_SUCCESS,
        payload: data,
      });
      // console.log(data)
      

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