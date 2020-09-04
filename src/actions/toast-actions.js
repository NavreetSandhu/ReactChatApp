/*
 * @file: toast-actions.js
 * @description: It Contain toasts Action function.
 */

import { push } from 'react-router-redux';
import { toast } from 'react-toastify';
import * as TYPE from './constants';

export const toastAction = (status, message) => {
  if (status) {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 4000
    });
  } else {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 4000
    });
  }
};

export const toastErrorAction = (dispatch, message) => {
  toast.error(message, {
    position: toast.POSITION.TOP_CENTER,
    autoClose: 4000,
    onClose: () => {
      dispatch(push('/'));
    }
  });
  dispatch({ type: TYPE.LOG_OUT });
};

