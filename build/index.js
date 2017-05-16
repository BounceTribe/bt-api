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

app.use('/notifications/:type', function (req, res, next) {
  var data = req.body.data;
  var type = req.params.type;

  var byId = void 0,
      forId = void 0,
      extra = void 0;
  var sendEmail = false;

  switch (type) {
    case 'FRIEND_REQUEST':
      {

        break;
      }
    case 'FRIEND_REQUEST_ACCEPTED':
      {
        break;
      }
    case 'SESSION_FEEDBACK_RECEIVED':
    case 'PROJECT_FEEDBACK_RECEIVED':
      {
        var node = data.Comment.node;

        byId = node.author.id;
        forId = node.project.creator.id;
        extra = 'project: "' + node.project.id + '"';
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
    type: type,
    extra: extra
  });
  next();
});

var server = app.listen(app.get('port'), function () {
  console.log('Server is running at port ' + app.get('port'));
});