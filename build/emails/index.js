'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sendEmail;

var _mailgunJs = require('mailgun-js');

var _mailgunJs2 = _interopRequireDefault(_mailgunJs);

var _feedbackReceived = require('./feedbackReceived');

var _feedbackReceived2 = _interopRequireDefault(_feedbackReceived);

var _invitationReceived = require('./invitationReceived');

var _invitationReceived2 = _interopRequireDefault(_invitationReceived);

var _friendRequestAccepted = require('./friendRequestAccepted');

var _friendRequestAccepted2 = _interopRequireDefault(_friendRequestAccepted);

var _projectBounced = require('./projectBounced');

var _projectBounced2 = _interopRequireDefault(_projectBounced);

var _createHtml = require('./createHtml');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mailDomain = 'mail.bouncetribe.com';
// import {} from 'dotenv/config'

var siteDomain = 'test.bouncetribe.com';
var apiKey = process.env.mailgunKey;

var mailgun = new _mailgunJs2.default({ apiKey: apiKey, mailDomain: mailDomain });

var headline = void 0,
    mainText = void 0,
    imgMainHref = void 0,
    imgMainSrc = void 0;

function sendEmail(props) {

  console.log('sendemail props', props);
  var toEmail = props.toEmail,
      byHandle = props.byHandle,
      type = props.type,
      projectTitle = props.projectTitle,
      forHandle = props.forHandle,
      urlCode = props.urlCode,
      byId = props.byId,
      forId = props.forId;

  var subject = '';

  switch (type) {

    case 'TRIBE_REQUEST':
      {
        subject = 'New Tribe Request';
        headline = 'New Tribe Request!';
        mainText = byHandle + ' has invited you to their tribe.';
        imgMainHref = siteDomain + '/acceptInvite/tribe/' + forId + '/' + byId; //TODO
        imgMainSrc = 'https://raw.githubusercontent.com/BounceTribe/bt-api/master/src/img/acceptRequest.png';
        break;
      }

    case 'TRIBE_REQUEST_ACCEPTED':
      {
        subject = 'Tribe Request Accepted';
        headline = 'Tribe Request Accepted!';
        mainText = byHandle + ' has joined your tribe.';
        imgMainHref = siteDomain + '/tribe/' + forHandle;
        imgMainSrc = 'https://raw.githubusercontent.com/BounceTribe/bt-api/master/src/img/viewTribe.png';
        break;
      }

    case 'PROJECT_FEEDBACK_RECEIVED':
      {
        headline = 'Feedback Received!';
        mainText = byHandle + ' liked your ' + projectTitle + ' project and bounced it to share with their tribe.';
        imgMainHref = siteDomain + '/' + forHandle + '/' + projectTitle;
        imgMainSrc = 'https://raw.githubusercontent.com/BounceTribe/bt-api/master/src/img/viewProject.png';
        subject = 'Feedback Received';
        break;
      }

    case 'BOUNCED':
      {
        subject = 'Project Bounced';
        headline = 'Project Bounced!';
        mainText = byHandle + ' liked your ' + projectTitle + ' project and bounced it to share with their tribe.';
        imgMainHref = siteDomain + '/' + forHandle + '/' + projectTitle;
        imgMainSrc = 'https://raw.githubusercontent.com/BounceTribe/bt-api/master/src/img/viewProject.png';
        break;
      }

    case 'INVITATION_RECEIVED':
      {
        subject = 'BounceTribe Invitation Received';
        headline = byHandle + ' has invited you to join their tribe!';
        mainText = 'Your friend is using BounceTribe to share their music and wants to collaborate with you.';
        imgMainHref = siteDomain + '/' + forId + '/acceptInvite/join/' + byId; //TODO
        imgMainSrc = 'https://raw.githubusercontent.com/BounceTribe/bt-api/master/src/img/acceptInvite.png';
        break;
      }

    default:
      {
        console.log('unknown email type', props);
      }
  }

  var generatedHtml = (0, _createHtml.createHtml)({ headline: headline, mainText: mainText, imgMainHref: imgMainHref, imgMainSrc: imgMainSrc });
  // console.log('gen', generatedHtml);
  if (!generatedHtml.errors.length) {
    console.log('MAILGUN', toEmail, subject);
    mailgun.messages().send({
      from: "BounceTribe <hello@bouncetribe.com>",
      to: toEmail,
      html: generatedHtml.html,
      subject: subject
    }, function (error, body) {
      if (error) {
        console.log('mailgun error', error);
      } else {
        console.log('eb', error, body);
      }
    });
  } else {
    console.log('email error', generatedHtml.errors);
  }
}