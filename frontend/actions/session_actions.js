import * as SessionApiUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';

export const receiveCurrentUser = (payload) => {

  return {
    type: RECEIVE_CURRENT_USER,
    user: payload.user
  };
};

export const receiveSessionErrors = (errors) => {

  return {
    type: RECEIVE_SESSION_ERRORS,
    errors: errors
  };
};

export const logoutCurrentUser = () => {
  return {
    type: LOGOUT_CURRENT_USER
  };
};

export const login = (user) => {
  return dispatch => {
    return SessionApiUtil.login(user).then(
      (user) => {
        return dispatch(receiveCurrentUser(user));
      },
      (errors) => {return dispatch(receiveSessionErrors(errors.responseJSON));}
    );
  };
};

export const logout = () => {
  return dispatch => {
    return SessionApiUtil.logout().then(() => dispatch(logoutCurrentUser()));
  };
};

export const signup = (user) => {

  return dispatch => {
    return SessionApiUtil.signup(user).then(
      (payload) => dispatch(receiveCurrentUser(payload)),
      (errors) => {
        return dispatch(receiveSessionErrors(errors.responseJSON));
      }
    );
  };
};
