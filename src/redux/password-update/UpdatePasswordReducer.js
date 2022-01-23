import { UPDATE_PASSWORD_FAILURE, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS } from "./UpdatePasswordTypes";

export const updatePasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_PASSWORD_REQUEST:
            return { loading_pass: true};
        case UPDATE_PASSWORD_SUCCESS:
            return { loading_pass: false, changePassword: action.payload, status:true };
        case UPDATE_PASSWORD_FAILURE:
            return { loading_pass: false, error_pass: action.payload };
        default: 
            return state
    }
}