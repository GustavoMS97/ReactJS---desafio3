/**
 * TYPES
 */

export const TYPES = {
  ADD_REQUEST: 'USERS/ADD_REQUEST',
  ADD_SUCCESS: 'USERS/ADD_SUCCESS',
  ADD_FAILURE: 'USERS/ADD_FAILURE',
  REMOVE_REQUEST: 'USERS/REMOVE_REQUEST',
};

/**
 * REDUCER
 */

const INITIAL_STATE = {
  users: [],
  loading: false,
  error: null,
};

export default function users(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TYPES.ADD_REQUEST:
      return { ...state, loading: true };
    case TYPES.ADD_SUCCESS:
      return {
        ...state,
        users: [...state.users, action.payload.user],
        loading: false,
        error: null,
      };
    case TYPES.ADD_FAILURE:
      return { ...state, loading: false, error: action.payload.error };
    case TYPES.REMOVE_REQUEST:
      return { ...state, users: state.users.filter(user => user.id !== action.payload.user) };
    default:
      return state;
  }
}

/**
 * Actions
 */

export const Creators = {
  addUserRequest: (user, lat, long) => ({
    type: TYPES.ADD_REQUEST,
    payload: { user, lat, long },
  }),

  addUserSuccess: user => ({
    type: TYPES.ADD_SUCCESS,
    payload: { user },
  }),

  addUserFailure: error => ({
    type: TYPES.ADD_FAILURE,
    payload: { error },
  }),

  removeUser: user => ({
    type: TYPES.REMOVE_REQUEST,
    payload: { user },
  }),
};
