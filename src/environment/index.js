/*
 * @file: index.js
 * @description: It Contain environment variables.
 */

const local = {
    apiUrl: 'http://54.190.192.105:6037/api/v1',
    socketUrl: 'http://54.190.192.105:6037',
    file: 'http://54.190.192.105:6037/',

};
const production = {
    apiUrl: '',
    socketUrl: '',
    file: '',

};

if (process.env.NODE_ENV === 'production') {
  module.exports = production;
} else {
  module.exports = local;
}
