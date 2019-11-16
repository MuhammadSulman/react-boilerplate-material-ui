/*
 *
 * LoginPage reducer
 *
 */
import produce from "immer";
import * as actions from "./constants";

export const initialState = {
    form: {email: '', password: ''},
};

/* eslint-disable default-case, no-param-reassign */
const loginPageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
        case actions.CHANGE_INPUT:
            draft.form = {...action.requestPayload};
            break;

        case actions.SUBMIT_FORM:
            console.log(initialState.form);
            break;
    }
  });

export default loginPageReducer;
