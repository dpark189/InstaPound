import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from '../actions/session_actions';
import { merge } from 'lodash';

const defaultState = {
  id: null
};

export default (state = defaultState, action ) => {
  Object.freeze(state);
  const newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return { id: action.user.id };
      // TODO: need to change this to accept username if url paths are going to use username instaed of id
    case LOGOUT_CURRENT_USER:
      return defaultState;
    default:
      return state;
    }
};
