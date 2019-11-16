import * as constants from './constants';
import * as appActions from "../App/actions";
import * as actions from './actions';
import Request from '../../utils/NetworkManager';
import {takeLatest, all, put, call} from 'redux-saga/effects';

function* workerSubmit(action) {
    try {
        const payload = action.payload;
        const username = payload.data.email;
        const password = payload.data.password;

        const token = btoa(username + ":" + password);
        const response = yield Request.get(constants.LOGIN_API_URL, {
            headers: {
                Authorization: 'Basic ' + token
            }
        });

        if(response.id) {
            localStorage.setItem('token', token);
            localStorage.setItem('id', response);
            yield put(appActions.initializeAuthUser(response));
            yield call(payload.history.push('/'));
        }
    } catch (error) {
        console.log(error);
        yield put(actions.submitFormFailure(error));
    }
}

function* watchAll() {
    yield all([
        takeLatest(constants.SUBMIT_FORM, workerSubmit),
    ]);
}

export default watchAll;
