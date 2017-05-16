'use strict';

require('babel-polyfill');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

var _authMiddleware = require('./authMiddleware');

var _authMiddleware2 = _interopRequireDefault(_authMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

var port = process.env.PORT || 3000;

app.set('port', port);

// app.use(authMiddleware)


app.use('*', (0, _expressGraphql2.default)(function (req) {
  console.log("req", req);
  console.log("req.body", req.body);
  return {
    schema: _schema2.default,
    graphiql: true
  };
}));

var server = app.listen(app.get('port'), function () {
  console.log('Server is running at port ' + app.get('port'));
});