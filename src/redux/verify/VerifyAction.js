import axios from "axios";
import { BACKEND_BASE_URL } from "../backendUrl";
import { VERIFY_EMAIL_FAILURE, VERIFY_EMAIL_REQUEST, VERIFY_EMAIL_SUCCESS } from "./VerifyTypes";


export const verify =
  (email, verification_code) => async (dispatch) => {
    try {
      dispatch({
        type: VERIFY_EMAIL_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${BACKEND_BASE_URL}/authentication/verify_code`,
        { email, verification_code },
        config
      );
      console.log(data)

      dispatch({
        type: VERIFY_EMAIL_SUCCESS,
        payload: data,
      });
      if( data.status === 200 ){
        setTimeout(()=>{
          document.location.href = "/verify-complete"
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
        type: VERIFY_EMAIL_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };