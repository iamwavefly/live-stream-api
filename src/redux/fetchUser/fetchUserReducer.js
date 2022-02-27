import { FETCH_USER_FAIL, FETCH_USER_REQUEST, FETCH_USER_SUCCESS } from "./fetchUserType";


export const fetchUserReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_USER_REQUEST:
            return { loading: true};
        case FETCH_USER_SUCCESS:
            return { loading: false, userDet:action.payload, status:true };
        case FETCH_USER_FAIL:
            return { loading: false, error: action.payload };
        default: 
            return state
    }
}