import {
  authenticate_User,
  set_Refresh_Token,
  set_Token,
  set_User_Info,
} from '../constant';
const initialState = {tokenDetails: {isLoading: false}};
const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case authenticate_User:
      return {
        ...state.tokenDetails,
        isLoading: true,
      };
    case set_Token:
      return {
        ...state.tokenDetails,
        auth: action.auth,
        isLoading: true,
      };
    case set_Refresh_Token:
      return {
        ...state.tokenDetails,
        ...action.data,
      };

    default:
      return state;
  }
};

export default tokenReducer;
