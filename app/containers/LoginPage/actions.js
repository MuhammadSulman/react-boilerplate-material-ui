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

export function submit(requestPayload) {
  return {
    type: actions.SUBMIT_FORM,
    requestPayload,
  };
}

export function submitFormFailure(error) {
  return {
    type: actions.SUBMIT_FORM_FAILURE,
    error,
  }
}
