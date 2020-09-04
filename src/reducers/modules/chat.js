/*
 * @file: chat.js
 * @description: Reducers and actions for store/manipulate user's  data
 * @author: smartData
*/

import * as TYPE from '../../actions/constants';
import chat from '../../containers/dashboard/chat';

/******** Reducers ********/
const initialState = {
    contacts: null,
    chat: null,
    roomid:null,
    files: null,
    name: null,
    userid:null
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case TYPE.CONTACTS:
            return { ...state, contacts: action.data };
        case TYPE.CHAT:

            return { ...state, chat: action.data };
        case TYPE.CHATADD:

            return {
                ...state, chat: { ...state.chat, rows: [ ...action.data, ...state.chat.rows ] }
            };
        case TYPE.CHATADDS:

            return {
                ...state, chat: { ...state.chat, rows: [...state.chat.rows, action.data] }
            };
        case TYPE.ROOMID:
            return { ...state, roomid: action.data };
        case TYPE.FILES:
            return { ...state, files: action.data };
        case TYPE.USERID:
            return { ...state, userid: action.data };
        case TYPE.NAME:
            return { ...state, name: action.data };
        default:
            return state;
    }
}
