import { UPLOAD_PICS_FAILURE, UPLOAD_PICS_REQUEST, UPLOAD_PICS_SUCCESS } from "./UploadPicsTypes";


export const updatePicsReducer = (state = {}, action) => {
    switch (action.type) {
        case UPLOAD_PICS_REQUEST:
            return { loading_pics: true};
        case UPLOAD_PICS_SUCCESS:
            return { loading_pics: false, newPhoto:action.payload, status:true };
        case UPLOAD_PICS_FAILURE:
            return { loading_pics: false, error_pics: action.payload };
        default: 
            return state
    }
}