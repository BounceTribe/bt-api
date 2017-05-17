'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sendEmail;

var _mailgunJs = require('mailgun-js');

var _mailgunJs2 = _interopRequireDefault(_mailgunJs);

var _feedbackReceived = require('./feedbackReceived');

var _feedbackReceived2 = _interopRequireDefault(_feedbackReceived);

var _friendRequestAccepted = require('./friendRequestAccepted');

var _friendRequestAccepted2 = _interopRequireDefault(_friendRequestAccepted);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var domain = 'mail.bouncetribe.com';
var mailgunKey = process.env.mailgunKey;

var mailgun = new _mailgunJs2.default({ mailgunKey: mailgunKey, domain: domain });

function sendEmail(_ref) {
  var toEmail = _ref.toEmail,
      forHandle = _ref.forHandle,
      type = _ref.type;


  var html = '';
  var subject = '';
  switch (type) {
    case 'FRIEND_REQUEST':
      {
        break;
      }
    case 'FRIEND_REQUEST_ACCEPTED':
      {
        html = (0, _friendRequestAccepted2.default)(forHandle);
        subject = 'Friend Request Accepted';
        break;
      }
    case 'PROJECT_FEEDBACK_RECEIVED':
    case 'SESSION_FEEDBACK_RECEIVED':
      {
        html = (0, _feedbackReceived2.default)(forHandle);
        subject = 'Feedback Received';
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

  if (html) {
    mailgun.messages().send({
      from: "hello@bouncetribe.com",
      to: toEmail,
      html: html,
      subject: subject
    }, function (error, body) {
      if (error) {
        console.log(error);
      }
    });
  }
}