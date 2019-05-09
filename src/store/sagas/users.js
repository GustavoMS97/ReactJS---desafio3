import { call, put, select } from 'redux-saga/effects';
import axios from 'axios';

import { Creators as UserActions } from '../ducks/users';

export function* addUser(action) {
  try {
    const { data } = yield call(axios.get, `https://api.github.com/users/${action.payload.user}`);
    const isDuplicated = yield select(state => state.users.users.find(user => user.id === data.id));
    if (isDuplicated) {
      yield put(UserActions.addUserFailure('Usuário duplicado.'));
    } else {
      yield put(
        UserActions.addUserSuccess({
          id: data.id,
          name: data.name,
          avatar: data.avatar_url,
          url: data.html_url,
          login: data.login,
          latitude: action.payload.lat,
          longitude: action.payload.long,
        }),
      );
    }
  } catch (error) {
    yield put(UserActions.addUserFailure('Erro ao adicionar usuário.'));
  }
}
