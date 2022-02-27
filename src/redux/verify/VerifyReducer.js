import { VERIFY_EMAIL_FAILURE, VERIFY_EMAIL_REQUEST, VERIFY_EMAIL_SUCCESS } from "./VerifyTypes";


export const verifyEmailReducer = (state = {}, action) => {
    switch (action.type) {
      case VERIFY_EMAIL_REQUEST:
        return { loading: true };
      case VERIFY_EMAIL_SUCCESS:
        return { loading: false, verfiyInfo: action.payload, status:true };
      case VERIFY_EMAIL_FAILURE:
        return { loading: false, error: action.payload };
    //   case USER_LOGOUT:
    //     return {};
      default:
        return state;
    }
  };