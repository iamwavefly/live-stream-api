import axios from "axios";
import { BACKEND_BASE_URL } from "../backendUrl";
import { FETCH_USER_FAIL, FETCH_USER_REQUEST, FETCH_USER_SUCCESS } from "./fetchUserType";


export const fetchUserDetails =
  () => async (dispatch) => {
    try {
      dispatch({
        type: FETCH_USER_REQUEST,
      });

      const user_det = await JSON.parse(localStorage.getItem('userInfo'));

      const config = {
        headers: {
        },
      };

      const { data } = await axios.get(
        `${BACKEND_BASE_URL}/account/get_user?token=${user_det.data.token}`,
        config
      );

      dispatch({
        type: FETCH_USER_SUCCESS,
        payload: data,
      });

    } catch (error) {
      dispatch({
        type: FETCH_USER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };