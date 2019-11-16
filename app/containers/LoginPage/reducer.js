/*
 *
 * LoginPage reducer
 *
 */
import produce from "immer";
import * as actions from "./constants";

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const loginPageReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case actions.SUBMIT_FORM:
        break;
    }
  });

export default loginPageReducer;
