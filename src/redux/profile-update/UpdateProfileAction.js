import axios from "axios";
import { BACKEND_BASE_URL } from "../backendUrl";
import { UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS } from "./UpdateProfileTypes";


export const editUser =
  (fullname, email) => async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_PROFILE_REQUEST
      });

      const user_det = await JSON.parse(localStorage.getItem('userInfo'));
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer "+user_det.token
        },
      };

      const { data } = await axios.put(
        `${BACKEND_BASE_URL}/user/update`,
        { fullname, email },
        config
      );

      dispatch({
        type: UPDATE_PROFILE_SUCCESS,
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
        type: UPDATE_PROFILE_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };