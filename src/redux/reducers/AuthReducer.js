const SET_LOGIN = "set_login";
const SET_USER = "set_user";

const AuthInitialState = {
  login: false,
  id: null,
};

export const setUser = (id) => ({
  type: SET_USER,
  id,
});

export const setLogin = (isLogin) => ({
  type: SET_LOGIN,
  isLogin,
});

export const UserReducer = (state = AuthInitialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        id: action.id,
      };
    default:
      return state;
  }
};

export const AuthReducer = (state = AuthInitialState, action) => {
  switch (action.type) {
    case SET_LOGIN:
      return {
        ...state,
        isLogin: action.isLogin,
      };
    case SET_USER:
      return {
        ...state,
        id: action.id,
      };
    default:
      return state;
  }
};
