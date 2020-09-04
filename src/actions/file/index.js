/*
 * @file: index.js
 * @description: It Contain files related Action Creators.
 */

import * as TYPE from '../constants';
import ApiClient from '../../api-client';
import { file } from '../../environment';
import { toastErrorAction } from '../toast-actions';

export const is_fetching = (status) => ({ type: TYPE.IS_FETCHING, status });

/****** action creator for upload operator image ********/
export const uploadFile = (data, callback) => {



    return (dispatch) => {
      dispatch(is_fetching(true));
      //ApiClient.postFormData(`${file}/file`, data).then(response => {
      //  if (response.statusCode === 401) {
      //    toastErrorAction(dispatch, response.message);
      //  } else if (response.statusCode === 200) {
      //    dispatch(is_fetching(false));
      //    callback(true, response.data);
      //  } else {
      //    dispatch(is_fetching(false));
      //    callback(false);
      //  }
      //});
    };
  };

/****** remove uploaded files from amazon  creator for upload operator image ********/
export const removeFile = (data, callback) => {

    return (dispatch, getState) => {
      const {
        data: { loginToken }
      } = getState().user;
      dispatch(is_fetching(true));
      ApiClient.delete(`${file}/file?key=${data.key}&fileName=${data.fileName}`, loginToken).then(response => {
        if (response.statusCode === 401) {
          toastErrorAction(dispatch, response.message);
        } else if (response.statusCode === 200) {
          dispatch(is_fetching(false));
          callback(true);
        } else {
          dispatch(is_fetching(false));
          callback(false);
        }
      });
    };
  };