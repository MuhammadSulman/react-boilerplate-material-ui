/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */
import {APP_NAME} from "../../utils/constants";

export const INITIALIZE_AUTH_USER = APP_NAME + 'App/INITIALIZE_AUTH_USER';

export const UPLOAD_IMAGE = APP_NAME + '/App/UPLOAD_IMAGE';
export const UPLOAD_IMAGE_SUCCESS = APP_NAME + '/App/UPLOAD_IMAGE_SUCCESS';
export const UPLOAD_IMAGE_API_URL = '/files/upload';

export const FETCH_AUTH_USER = APP_NAME + '/App/FETCH_AUTH_USER';
export const FETCH_AUTH_USER_SUCCESS = APP_NAME + '/App/FETCH_AUTH_USER_SUCCESS';

export const LOGIN_API_URL =  '/account';
