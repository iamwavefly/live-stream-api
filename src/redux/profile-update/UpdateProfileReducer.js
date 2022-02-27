import { UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS } from "./UpdateProfileTypes";


export const updateUserReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_PROFILE_REQUEST:
            return { loading_new: true};
        case UPDATE_PROFILE_SUCCESS:
            return { loading_new: false, newDetails:action.payload, status:true };
        case UPDATE_PROFILE_FAILURE:
            return { loading_new: false, error_new: action.payload };
        default: 
            return state
    }
}