/*
 *
 * LoginPage actions
 *
 */

import * as actions from './constants';


export function submit(data) {
  return {
    type: actions.SUBMIT_FORM,
    data,
  };
}

export function submitFormFailure(error) {
  return {
    type: actions.SUBMIT_FORM_FAILURE,
    error,
  }
}
