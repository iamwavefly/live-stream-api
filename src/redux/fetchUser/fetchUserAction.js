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
      // console.log(user_det)

      const config = {
        headers: {
        },
      };

      const { data } = await axios.get(
        `${BACKEND_BASE_URL}/account/get_user?token=${user_det.data.token}`,
        config
      );
      // console.log(data)

      dispatch({
        type: FETCH_USER_SUCCESS,
        payload: data,
      });

      // if( data.status === "success" ){
      //   setTimeout(()=>{
      //      window.location.href  = "/verify"
      //   }, 500)
      // }

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