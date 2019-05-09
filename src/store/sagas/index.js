import { all, takeLatest } from 'redux-saga/effects';
import { addUser } from './users';
import { TYPES as UserTypes } from '../ducks/users';

export default function* rootSaga() {
  yield all([takeLatest(UserTypes.ADD_REQUEST, addUser)]);
}
