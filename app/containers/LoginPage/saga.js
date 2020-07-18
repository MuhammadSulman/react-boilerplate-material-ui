import * as constants from './constants';
import * as appActions from "../App/actions";
import * as actions from './actions';
import Request from '../../utils/NetworkManager';
import {takeLatest, all, put, call} from 'redux-saga/effects';

function* workerSubmit(action) {
    try {
        const requestPayload = action.requestPayload;

        const response = yield Request.post(constants.LOGIN_API_URL, requestPayload.formData);

        if(response.token) {
            localStorage.setItem('token', response.token);
            yield put(appActions.initializeAuthUser(response));
            yield call(requestPayload.history.push('/'));
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
