
/*********** Reduceres defined here *********/

import { persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage'; // default: localStorage if web, AsyncStorage if react-native
import { routerReducer as router } from 'react-router-redux';
import encryptor from './encryptor';
import user from './modules/user';
import chat from './modules/chat';
import loader from './modules/loader';

const userPersistConfig = {
  key: 'athleqe-app',
  storage: storage,
  transforms: [encryptor],
  blacklist: ['loader']
};

export default persistCombineReducers(userPersistConfig, {
  loader,
  user,
  chat,  
  router
});
