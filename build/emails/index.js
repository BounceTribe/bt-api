'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = sendEmail;

var _mailgunJs = require('mailgun-js');

var _mailgunJs2 = _interopRequireDefault(_mailgunJs);

var _createHtml = require('./createHtml');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var siteDomain = 'https://test.bouncetribe.com';
// import {} from 'dotenv/config'

var domain = 'mail.bouncetribe.com';
var wordpressUploads = 'http://bouncetribe.com/wp-content/uploads';
var apiKey = process.env.mailgunKey;

var mailgun = new _mailgunJs2.default({ apiKey: apiKey, domain: domain });

function sendEmail(_ref) {
  var toEmail = _ref.toEmail,
      byHandle = _ref.byHandle,
      byId = _ref.byId,
      inviteId = _ref.inviteId,
      type = _ref.type,
      projectTitle = _ref.projectTitle,
      sessionId = _ref.sessionId,
      forHandle = _ref.forHandle,
      urlCode = _ref.urlCode;

  console.log('emailSend', { toEmail: toEmail, byHandle: byHandle, type: type, inviteId: inviteId, projectTitle: projectTitle, sessionId: sessionId, forHandle: forHandle, urlCode: urlCode, byId: byId });
  var headline = void 0,
      mainText = void 0,
      imgMainHref = void 0,
      imgMainSrc = void 0,
      html = void 0,
      subject = void 0;
  switch (type) {

    case 'FRIEND_REQUEST':
      {
        subject = 'New Tribe Request';
        headline = 'New Tribe Request!';
        mainText = byHandle + ' has invited you to their tribe.';
        imgMainHref = siteDomain + '/acceptrequest/' + inviteId + '/' + byId; //TODO
        imgMainSrc = wordpressUploads + '/2017/11/Accept-Request-btn.png';
        break;
      }

    case 'FRIEND_REQUEST_ACCEPTED':
      {
        subject = 'Tribe Request Accepted';
        headline = 'Tribe Request Accepted!';
        mainText = byHandle + ' has joined your tribe.';
        imgMainHref = siteDomain + '/tribe/' + forHandle;
        imgMainSrc = wordpressUploads + '/2017/11/View-My-Tribe-btn.png';
        break;
      }

    case 'PROJECT_FEEDBACK_RECEIVED':
      {
        headline = 'Feedback Received!';
        mainText = byHandle + ' liked your ' + projectTitle + ' has given you some feedback. See what they had to say.';
        imgMainHref = siteDomain + '/' + forHandle + '/' + projectTitle;
        imgMainSrc = wordpressUploads + '/2017/11/View-Feedback-btn.png';
        subject = 'Feedback Received';
        break;
      }

    case 'BOUNCED':
      {
        subject = 'Project Bounced';
        headline = 'Project Bounced!';
        mainText = byHandle + ' liked your ' + projectTitle + ' project and bounced it to share with their tribe.';
        imgMainHref = siteDomain + '/' + forHandle + '/' + projectTitle;
        imgMainSrc = wordpressUploads + '/2017/11/View-Project-btn.png';
        break;
      }

    case 'INVITATION_RECEIVED':
      {
        subject = 'BounceTribe Invitation Received';
        headline = byHandle + ' has invited you to join their tribe!';
        mainText = 'Your friend is using BounceTribe to share their music and wants to collaborate with you.';
        imgMainHref = siteDomain + '/acceptinvite/' + byId; //TODO - add secret code
        imgMainSrc = wordpressUploads + '/2017/11/Accept-Request-btn.png';
        break;
      }

    default:
      {
        console.log('unknown email type');
      }
  }

  var generatedHtml = (0, _createHtml.createHtml)({ headline: headline, mainText: mainText, imgMainHref: imgMainHref, imgMainSrc: imgMainSrc, forHandle: forHandle });

  html = generatedHtml.html;

  if (html) {
    mailgun.messages().send({
      from: "BounceTribe <hello@bouncetribe.com>",
      to: toEmail,
      html: html,
      subject: subject
    }, function (error, body) {
      if (error) {
        console.log('email error:', error);
      } else {
        console.log('mailgun result:', body);
      }
    });
  }
}