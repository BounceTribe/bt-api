"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testQuery = exports.getClientGrant = exports.makeResourceServer = exports.setPass = undefined;

var _nodeFetch = require("node-fetch");

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _process$env = process.env,
    auth0API = _process$env.auth0API,
    auth0Secret = _process$env.auth0Secret;

// const getCredToken = () => {
//   console.log('updatePassword', auth0UserId, newPass);
//   let url = `https://bouncetribe.auth0.com/api/v2/oauth/token`
//
//   let options = {
//     method: 'POST',
//     headers: { 'content-type': 'application/json' },
//     body: JSON.stringify({
//       grant_type: 'client_credentials',
//       client_id: '22XLjQyIPQV2Y2jQe4c7Qh-WqwUYcwNR',
//       client_secret: auth0Secret,
//       audience: 'https://bouncetribe.auth0.com/api/v2/'
//     })
//     // idToken: auth.getToken()
//   }
//
//   return new Promise( (resolve, reject) => {
//     fetch(url, options)
//     .then(result => result.json())
//     .then(response => {
//       resolve(response)
//     })
//   })
// }

// import {} from 'dotenv/config'

var setPass = exports.setPass = function setPass(_ref) {
  var newPass = _ref.newPass,
      auth0UserId = _ref.auth0UserId;

  var url = "https://bouncetribe.auth0.com/api/v2/users/" + auth0UserId;

  var options = {
    method: "PATCH",
    body: JSON.stringify({ 'password': newPass }),
    headers: {
      Authorization: "Bearer " + auth0API,
      "Content-Type": "application/json"
    }
  };
  return new Promise(function (resolve, reject) {
    (0, _nodeFetch2.default)(url, options).then(function (result) {
      return result.json();
    }).then(function (response) {
      return console.log('response', resolve(response));
    });
  });
};

var makeResourceServer = exports.makeResourceServer = function makeResourceServer() {
  var url = 'https://bouncetribe.auth0.com/api/v2/resource-servers';

  var options = {
    method: "POST",
    body: JSON.stringify({
      name: 'Bouncetribe API',
      identifier: 'https://bt-carl-api.herokuapp.com/',
      signing_alg: 'RS256',
      scopes: [{ value: 'resource_server' }]
    }),
    headers: {
      Authorization: "Bearer " + auth0API,
      "Content-Type": "application/json"
    },
    json: true
  };
  return new Promise(function (resolve, reject) {
    (0, _nodeFetch2.default)(url, options).then(function (result) {
      return result.json();
    }).then(function (response) {
      return console.log('response', response);
    });
  });
};

var getClientGrant = exports.getClientGrant = function getClientGrant() {
  var url = "https://bouncetribe.auth0.com/oauth/token";

  var options = {
    method: "POST",
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: '22XLjQyIPQV2Y2jQe4c7Qh-WqwUYcwNR',
      client_secret: auth0Secret,
      audience: 'https://bt-carl-api.herokuapp.com/' }), //TODO
    headers: {
      // Authorization: "Bearer " + auth0API,
      "Content-Type": "application/json"
    }
  };
  return new Promise(function (resolve, reject) {
    (0, _nodeFetch2.default)(url, options).then(function (result) {
      return result.json();
    }).then(function (response) {
      return console.log('response', response);
    });
  });
};

var testQuery = exports.testQuery = function testQuery(auth0UserId) {
  var url = "https://bouncetribe.auth0.com/api/v2/users?q=email.raw%3A%22subliminal_lime%40hotmail.com%22&search_engine=v2";
  var options = {
    method: "GET",
    // body: JSON.stringify({ 'password': newPass }),
    // body: { q: 'email.raw:"holesinabarrel@gmail.com"', search_engine: 'v2' },
    headers: {
      Authorization: "Bearer " + auth0API,
      "Content-Type": "application/json"
    }
  };
  return new Promise(function (resolve, reject) {
    (0, _nodeFetch2.default)(url, options).then(function (result) {
      return result.json();
    }).then(function (response) {
      return console.log('response', response);
    });
  });
};

// export default setPass


// fetch("https://bouncetribe.auth0.com/api/v2/resource-servers", {
//   body: "{"name":"My Sample API","identifier": "https://my-api-urn","signing_alg": "RS256","scopes": [{ "value": "sample-scope", "description": "Description for Sample Scope"}]}",
//   headers: {
//     authorization: "Bearer " + auth0API,
//     "content-type": "application/json",
//     "Content-Type": "application/x-www-form-urlencoded"
//   },
//   method: "POST"
// })