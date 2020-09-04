/*
 * @file: connection.js
 * @description: It Contain files related Action Creators.
 */

import * as TYPE from '../constants';
import ApiClient from '../../api-client';
import { toastErrorAction } from '../toast-actions';
import { apiUrl } from '../../environment';
import { toastAction } from '../toast-actions';

export const is_fetching = (status) => ({ type: TYPE.IS_FETCHING, status });
export const contacts = (data) => ({ type: TYPE.CONTACTS, data });
export const chatlist = (data) => ({ type: TYPE.CHAT, data });

export const chatadd = (data) => ({ type: TYPE.CHATADD, data });
export const chatadds = (data) => ({ type: TYPE.CHATADDS, data });

export const files = (data) => ({ type: TYPE.FILES, data });
export const roomId = (data) => ({ type: TYPE.ROOMID, data });
export const saveName = (data) => ({ type: TYPE.NAME, data });
export const userId = (data) => ({ type: TYPE.USERID, data });

export const logout_user = () => ({ type: TYPE.LOG_OUT });

/****** action creator for  getcontacts ********/
export const getContacts = (params, callback) => {
    return (dispatch, getState) => {
        const {
            data: { loginToken }
        } = getState().user;
        //dispatch(is_fetching(true));
        ApiClient.post(`${apiUrl}/contact`, params, loginToken).then(response => {
            if (response.status === 200) {
                //dispatch(is_fetching(false));
                dispatch(contacts(response.data));
                callback(true);
            }
            else if (response.status === 401) {
                dispatch(logout_user());
                callback(false);
               // dispatch(is_fetching(false));


            }
            else {
                //dispatch(is_fetching(false));
                callback(true);
            }
        });
    };
};

/****** action creator for  chat ********/
export const getChat = (params, callback) => {
    return (dispatch, getState) => {
        const {
            data: { loginToken }
        } = getState().user;
        if (params.pageNumber == 1) {
            dispatch(is_fetching(true));
        }
        ApiClient.post(`${apiUrl}/chatMessage`, params, loginToken).then(response => {
            if (response.status === 200) {
                dispatch(is_fetching(false));
                if (params.pageNumber == 1) {

                    const n = {
                        count: response.data.count,
                        rows: response.data.rows.reverse()
                    };
                    dispatch(chatlist(n));
                }
                else {
                    dispatch(chatadd(response.data.rows.reverse()));
                }
                callback(true);
            }
            else if (response.status === 401) {
                dispatch(logout_user());
                callback(false);
                dispatch(is_fetching(false));


            }
            else {
                dispatch(is_fetching(false));
                callback(true);
            }
        });
    };
};
/****** action creator for  uplad doc ********/
export const uploadDoc = (params, callback) => {
    return (dispatch, getState) => {
        const {
            data: { loginToken }
        } = getState().user;
        dispatch(is_fetching(true));
        ApiClient.postFormDataNew(`${apiUrl}/chatMedia`, params, loginToken).then(response => {
            if (response.status === 200) {
                dispatch(is_fetching(false));
                dispatch(files(response.data));
                callback(true);
            }
            else if (response.status === 401) {
                dispatch(logout_user());
                callback(false);
                dispatch(is_fetching(false));
                toastAction(false, response.message);


            }
            else {
                dispatch(is_fetching(false));
                callback(false);
                toastAction(false, response.message);

            }
        });
    };
};

