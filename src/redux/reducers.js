import { SET_USER_NAME, GET_CITIES } from "./actions";
import { SET_USER_UUID, GET_IS_REGISTERED } from "./actions";

const initialState = {
  name: "",
  cities: [],
  uuid:"",
  is_registered:{}
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_NAME:
      return { ...state, name: action.payload };
    case SET_USER_UUID:
      return { ...state, uuid: action.payload };
    case GET_CITIES:
      return { ...state, cities: action.payload };
    case GET_IS_REGISTERED:
      return { ...state, is_registered: action.payload };
    default:
      return state;
  }
};

export default userReducer;
