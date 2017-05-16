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

app.use('/notifications/:type', function (req, res, next) {
  console.log("req.params", req.params);
  // let {author, project} = req.body.createdNode
  // let {id: byId} = author
  // let {id: forId} = project.creator
  var node = req.body.createdNode;
  var type = req.params.type;

  var byId = void 0,
      forId = void 0;
  var sendEmail = false;

  switch (type) {
    case 'FRIEND_REQUEST':
      {
        byId = node.author.id;
        forId = node.project.creator.id;
        break;
      }
    case 'FRIEND_REQUEST_ACCEPTED':
      {
        break;
      }
    case 'PROJECT_FEEDBACK_RECEIVED':
      {
        break;
      }
    case 'SESSION_FEEDBACK_RECEIVED':
      {
        break;
      }
    case 'SESSION_FEEDBACK_APPRECIATED':
      {
        break;
      }
    case 'FB_FRIEND_JOINED':
      {
        break;
      }
    case 'MESSAGE':
      {
        break;
      }
    case 'BOUNCED':
      {
        break;
      }
    default:
      {}
  }

  (0, _createNotification2.default)({
    byId: byId,
    forId: forId,
    type: type
  });
  next();
});

var server = app.listen(app.get('port'), function () {
  console.log('Server is running at port ' + app.get('port'));
});