/*
 * @file: product.js
 * @description: Reducers and actions for store/manipulate user's  data
*/

import * as TYPE from '../../actions/constants';

/******** Reducers ********/
const initialState = {
  data: null,
  loggedIn: false,
  role: null,
  other_profile: null,
  recommendations:null
};

export default function reducer(state = initialState, action) {

    switch (action.type) {
    case TYPE.ROLE_SET:
      return { ...state, role: action.role };
    case TYPE.LOGIN_SUCCESS:
      return { ...state, data: action.data, loggedIn: true };
   
    
    case TYPE.LOG_OUT:
      return initialState;
    default:
      return state;
  }
}
