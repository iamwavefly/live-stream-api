import { UPLOAD_VIDEO_FAILURE, UPLOAD_VIDEO_REQUEST, UPLOAD_VIDEO_SUCCESS } from "./VideoTypes";

export const uploadVideoReducer = (state = {}, action) => {
    switch (action.type) {
        case UPLOAD_VIDEO_REQUEST:
            return { loading_video: true};
        case UPLOAD_VIDEO_SUCCESS:
            return { loading_video: false, newVideo:action.payload, status:true };
        case UPLOAD_VIDEO_FAILURE:
            return { loading_video: false, error_video: action.payload };
        default: 
            return state
    }
}