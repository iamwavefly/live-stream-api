import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userRegisterReducer} from "./register/RegisterReducer";
import { userLoginReducer } from "./login/LoginReducer";
import { fetchUserReducer } from "./fetchUser/fetchUserReducer";
import { updateUserReducer } from "./profile-update/UpdateProfileReducer";
import { updatePasswordReducer } from "./password-update/UpdatePasswordReducer";


const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  fetchUser: fetchUserReducer,
  changeUser: updateUserReducer,
  passChange: updatePasswordReducer,
});
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
