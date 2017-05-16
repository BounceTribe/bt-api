'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

require('babel-polyfill');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _createNotification = require('./createNotification');

var _createNotification2 = _interopRequireDefault(_createNotification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import schema from './schema'
// import authMiddleware from './authMiddleware'

var app = (0, _express2.default)();

var port = process.env.PORT || 5000;

app.set('port', port);

// app.use(bodyParser.urlencoded({ extended: false }))


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
  console.log(_typeof(req.body));
  console.log(req.body.data);
  console.log(req.body.valueOf());
  var _req$body$createdNode = req.body.createdNode,
      author = _req$body$createdNode.author,
      project = _req$body$createdNode.project;
  var byId = createdNode.author.id;
  var forId = createdNode.project.creator.id;

  var type = "PROJECT_COMMENT";

  (0, _createNotification2.default)({
    byId: byId,
    forId: forId,
    type: type
  });
  res();
});

var server = app.listen(app.get('port'), function () {
  console.log('Server is running at port ' + app.get('port'));
});