/*
 * @file: index.js
 * @description: It Contain user related Action Creators.
 */

import * as TYPE from '../constants';
import ApiClient from '../../api-client';
import { apiUrl } from '../../environment';
import { toastAction } from '../toast-actions';
import { push } from 'connected-react-router';


export const is_fetching = (status) => ({ type: TYPE.IS_FETCHING, status });
export const login_success = (data) => ({ type: TYPE.LOGIN_SUCCESS, data });
export const logout_user = () => ({ type: TYPE.LOG_OUT });
export const roleSetup = (role) => ({ type: TYPE.ROLE_SET ,role});
export const signupData = (data) => ({ type: TYPE.UPDATE_PROFILE, data });


//**** Thunk Action Creators For Api ****//
/****** action creator for login ********/
export const login = (params, callback) => {
  return dispatch => {
    dispatch(is_fetching(true));
    ApiClient.post(`${apiUrl}/login`, params).then(response => {
      if (response.status === 200) {
        dispatch(is_fetching(false));
          dispatch(login_success(response.data));
          console.log(response.data);
          if (response.data.role_id === 1) {
              dispatch(roleSetup("user"));
          }
          else {
              dispatch(roleSetup("admin"));
          }
        callback(true);
      } else {
        dispatch(is_fetching(false));
        toastAction(false, response.message);
        callback(false);
      }
    });
  };
};

/****** action creator for signup ********/
export const signup = (params, callback) => {
  return dispatch => {
    dispatch(is_fetching(true));
    ApiClient.post(`${apiUrl}/signup`, params).then(response => {
      if (response.status === 200) {
        dispatch(is_fetching(false));
        callback(true);
      } else {
        dispatch(is_fetching(false));
          toastAction(false, response.message);
        callback(false);
      }
    });
  };
};

/****** action creator for resend email verification link ********/
export const resendEmailLink = (params, callback) => {
  return dispatch => {
    dispatch(is_fetching(true));
    ApiClient.post(`${apiUrl}/user/resend-email`, params).then(response => {
      if (response.statusCode === 200) {
        dispatch(is_fetching(false));
       // toastAction(true, response.msg);
        callback(true);
      } else {
        dispatch(is_fetching(false));
        //toastAction(false, response.msg);
        callback(false);
      }
    });
  };
};

/****** action creator for account verification ********/
export const accountVerification = (token,callback) => {
  return dispatch => {
    dispatch(is_fetching(true));
    ApiClient.get(`${apiUrl}/user/verifyAccount/${token}`).then(response => {
      if (response.status === 200) {
        dispatch(is_fetching(false));
        toastAction(true, response.msg);
        dispatch(login_success(response.data));
         callback(true);
      } else {
        dispatch(is_fetching(false));
        toastAction(false, response.msg);
         callback(false);
      }
    });
  };
};

/****** action creator for forgotpassword ********/
export const forgotPassword = (params, callback) => {
  return dispatch => {
    dispatch(is_fetching(true));
    ApiClient.post(`${apiUrl}/forgotPassword`, params).then(response => {
      if (response.status === 200) {
        dispatch(is_fetching(false));
        // toastAction(true, response.message); 
        callback(true);
      } else {
       dispatch(is_fetching(false));
        toastAction(false, response.message); 
        callback(false);
      }
    });
  };
};



/****** action creator for logout ********/
export const logout = (token, callback) => {
  return dispatch => {
    //dispatch(is_fetching(true));
    //ApiClient.delete(`${apiUrl}/user/logout`, token).then(response => {
    //  if (response.statusCode === 200) {
    //    dispatch(is_fetching(false));
        dispatch(logout_user());
        callback(true);
    //  } else {
    //    dispatch(is_fetching(false));
    //    toastAction(false, response.msg);
    //    callback(true);
    //  }
    //});
  };
};


/****** action creator for  media update ********/
export const mediaUpdate = (params, callback) => {
    return (dispatch, getState) => {
        const {
            data: { loginToken }
        } = getState().user;
        dispatch(is_fetching(true));
        ApiClient.postFormData(`${apiUrl}/media`, params, loginToken).then(response => {
            if (response.status === 200) {
                dispatch(is_fetching(false));
               // toastAction(true, response.message);
                callback(true);
            }
            else if (response.status === 401) {
                dispatch(logout_user());
                callback(false);
                dispatch(is_fetching(false));

            }
            else {
                dispatch(is_fetching(false));
                //toastAction(false, response.message);
                callback(false);
            }
        });
    };
};

/****** action creator for  delete update ********/
export const deleteImage = (params, callback) => {
    return (dispatch, getState) => {
        const {
            data: { loginToken }
        } = getState().user;
        dispatch(is_fetching(true));
        ApiClient.post(`${apiUrl}/media`, params, loginToken).then(response => {
            if (response.status === 200) {
                dispatch(is_fetching(false));
                //toastAction(true, response.message);
                callback(true);
            }
            else if (response.status === 401) {
                dispatch(logout_user());
                callback(false);
                dispatch(is_fetching(false));

            }
            else {
                dispatch(is_fetching(false));
                //toastAction(false, response.message);
                callback(false);
            }
        });
    };
};

