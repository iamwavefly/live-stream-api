import axios from "axios";
import { BACKEND_BASE_URL } from "../backendUrl";
import { FETCH_USER_FAIL, FETCH_USER_REQUEST, FETCH_USER_SUCCESS } from "./fetchUserType";


export const register =
  () => async (dispatch) => {
    try {
      dispatch({
        type: FETCH_USER_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${BACKEND_BASE_URL}/user/new`,
        config
      );

      dispatch({
        type: FETCH_USER_SUCCESS,
        payload: data,
      });
      if( data.status === "success" ){
        setTimeout(()=>{
          document.location.href = "/verify"
        }, 500)
      }

    //   dispatch({
    //     type: USER_LOGIN_SUCCESS,
    //     payload: data,
    //   });

      // localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      console.log(error)
      dispatch({
        type: FETCH_USER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };