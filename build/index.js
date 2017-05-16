'use strict';

require('babel-polyfill');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _createNotification = require('./createNotification');

var _createNotification2 = _interopRequireDefault(_createNotification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

var port = process.env.PORT || 5000;

app.set('port', port);

app.use(_bodyParser2.default.json());

var simple = 'https://api.graph.cool/simple/v1/bt-api';

app.use('/notifications', function (req, res, next) {
  var _req$body$createdNode = req.body.createdNode,
      author = _req$body$createdNode.author,
      project = _req$body$createdNode.project;
  var byId = author.id;
  var forId = project.creator.id;

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