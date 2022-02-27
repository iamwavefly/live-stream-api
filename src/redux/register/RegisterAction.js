import{
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
} from "./RegisterTypes";

import axios from "axios";
import { BACKEND_BASE_URL } from "../backendUrl";


export const register =
  (name, email, password) => async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${BACKEND_BASE_URL}/authentication/signup`,
        { name, email, password },
        config
      );

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });
      if( data.status === 200 ){
        setTimeout(()=>{
          document.location.href = "/verify?email="+email
        }, 500)
      }
      
    } catch (error) {
      console.log(error)
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
      });
    }
  };