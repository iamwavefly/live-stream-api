import { CREATE_SCHEDULE_FAILURE, CREATE_SCHEDULE_REQUEST, CREATE_SCHEDULE_SUCCESS, FETCH_SCHEDULE_FAILURE, FETCH_SCHEDULE_REQUEST, FETCH_SCHEDULE_SUCCESS } from "./ScheduleTypes";

export const createScheduleReducer = (state = {}, action) => {
    switch (action.type) {
      case CREATE_SCHEDULE_REQUEST:
        return { loading: true };
      case CREATE_SCHEDULE_SUCCESS:
        return { loading: false, createSchedule: action.payload, status:true };
      case CREATE_SCHEDULE_FAILURE:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };


export const fetchScheduleReducer = (state = {}, action) => {
    switch (action.type) {
      case FETCH_SCHEDULE_REQUEST:
        return { loading: true };
      case FETCH_SCHEDULE_SUCCESS:
        return { loading: false, allSchedule: action.payload, status:true };
      case FETCH_SCHEDULE_FAILURE:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };