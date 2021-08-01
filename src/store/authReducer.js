export const RETRIEVE_TOKEN = 'RETRIEVE_TOKEN';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const SIGN_UP = 'SIGN_UP';
export const RESET_PASSWORD = 'RESET_PASSWORD';

export const initialAuthState = {
  isLoading: false,
  name: null,
  userName: null,
  userEmail: null,
  userToken: true,
};

export const authReducer = (prevState, action) => {
  switch (action.type) {
    case RETRIEVE_TOKEN:
      return {
        ...prevState,
        userToken: action.userToken,
        isLoading: false,
      };
    case SIGN_IN:
      return {
        ...prevState,
        userName: action.userName,
        userEmail: action.userEmail,
        userToken: action.userToken,
        isLoading: false,
      };
    case SIGN_OUT:
      return {
        ...prevState,
        userName: null,
        userEmail: null,
        userToken: null,
        isLoading: false,
      };
    case SIGN_UP:
      return {
        ...prevState,
        userEmail: action.userEmail,
        userName: action.userName,
        userToken: action.userToken,
        isLoading: false,
      };
  }
};
