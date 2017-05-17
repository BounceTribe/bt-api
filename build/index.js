'use strict';

require('babel-polyfill');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _createNotification = require('./createNotification');

var _createNotification2 = _interopRequireDefault(_createNotification);

var _emails = require('./emails');

var _emails2 = _interopRequireDefault(_emails);

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
      toEmail = void 0,
      forHandle = void 0;
  var emailNotification = false;
  var extra = '';

  switch (type) {
    case 'FRIENDS':
      {
        var node = data.FriendRequest.node;

        if (node.accepted) {
          type = "FRIEND_REQUEST_ACCEPTED";
          byId = node.recipient.id;
          forId = node.actor.id;
          forHandle = node.actor.handle;
          toEmail = node.actor.email;
          emailNotification = true;
        } else {
          type = "FRIEND_REQUEST";
          byId = node.actor.id;
          forId = node.recipient.id;
        }
        break;
      }
    case 'COMMENT':
      {
        var _node = data.Comment.node;

        byId = _node.author.id;
        forId = _node.project.creator.id;
        toEmail = _node.project.creator.email;
        forHandle = _node.project.creator.handle;
        if (_node.session) {
          extra = 'sessionId: "' + _node.session.id + '"';
          type = 'SESSION_FEEDBACK_RECEIVED';
        } else if (_node.project) {
          extra = 'projectId: "' + _node.project.id + '"';
          type = 'PROJECT_FEEDBACK_RECEIVED';
        }
        emailNotification = true;
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

  if (emailNotification) {
    (0, _emails2.default)({
      toEmail: toEmail,
      forHandle: forHandle,
      type: type
    });
  }

  next();
});

var server = app.listen(app.get('port'), function () {
  console.log('Server is running at port ' + app.get('port'));
});