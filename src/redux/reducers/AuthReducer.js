const SET_LOGIN = "set_login";

const AuthInitialState = {
  login: false,
};

export const setLogin = (isLogin) => ({
  type: SET_LOGIN,
  isLogin,
});

export const AuthReducer = (state = AuthInitialState, action) => {
  switch (action.type) {
    case SET_LOGIN:
      return {
        ...state,
        isLogin: action.isLogin,
      };
    default:
      return state;
  }
};
