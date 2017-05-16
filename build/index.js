'use strict';

var createNotification = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_ref2) {
    var type = _ref2.type,
        forId = _ref2.forId,
        byId = _ref2.byId;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', (0, _nodeFetch2.default)(simple, {
              method: 'POST',
              headers: {
                'content-type': 'application/json'
              },
              body: JSON.stringify({
                query: '\n        mutation {\n          createNotification (\n            type: ' + type + '\n            notificationForId: ' + forId + '\n            triggeredById: ' + byId + '\n          ) {\n            id\n          }\n        }\n      '
              })
            }).then(function (response) {
              return response.json();
            }).then(function (json) {
              console.log("json", json);
            }));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function createNotification(_x) {
    return _ref.apply(this, arguments);
  };
}();

require('babel-polyfill');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// import schema from './schema'
// import authMiddleware from './authMiddleware'

var app = (0, _express2.default)();

var port = process.env.PORT || 3000;

app.set('port', port);

app.use(_bodyParser2.default.json());

// app.use('*', graphqlHTTP((req) =>{
//   console.log("req", req )
//   console.log("req.body", req.body )
//   return {
//     schema: schema,
//     graphiql: true,
//   }
// }))


var simple = 'https://api.graph.cool/simple/v1/bt-api';

app.use('/notifications', function (req, res, next) {

  console.log("req.body", req.body);
});

var server = app.listen(app.get('port'), function () {
  console.log('Server is running at port ' + app.get('port'));
});