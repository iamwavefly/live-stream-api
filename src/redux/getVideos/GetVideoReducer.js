import { FETCH_VIDEO_REQUEST, FETCH_VIDEO_SUCCESS } from "./GetVideoTypes";


export const getVideosReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_VIDEO_REQUEST:
            return { loading: true};
        case FETCH_VIDEO_SUCCESS:
            return { loading: false, allVideos:action.payload, status:true };
        case FETCH_VIDEO_SUCCESS:
            return { loading: false, error: action.payload };
        default: 
            return state
    }
}