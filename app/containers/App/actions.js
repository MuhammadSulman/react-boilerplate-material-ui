
import * as actions from './constants';

export function initializeAuthUser(payload) {
    return {
        type: actions.INITIALIZE_AUTH_USER,
        payload,
    }
}

export function imageUpload(payload) {
    console.log(payload);
    return {
        type: actions.UPLOAD_IMAGE,
        payload,
    };
}

export function imageUploadSuccess(payload) {
    return {
        type: actions.UPLOAD_IMAGE_SUCCESS,
        payload,
    };
}

export function fetchAuthUser() {
    return {
        type: actions.FETCH_AUTH_USER,
    }
}

export function fetchAuthUserSuccess(payload) {
    return {
        type: actions.FETCH_AUTH_USER_SUCCESS,
        payload,
    }
}