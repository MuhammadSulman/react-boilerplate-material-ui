/*
 *
 * LoginPage actions
 *
 */

import * as actions from './constants';


export function changeInput(requestPayload) {
  // console.log(evt)
  return {
    type: actions.CHANGE_INPUT,
    requestPayload,
  };
}

export function submit(data) {
  // console.log(data);
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
