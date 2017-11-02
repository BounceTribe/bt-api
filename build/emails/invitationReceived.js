'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = invitationReceived;

var _common = require('./common');

var _createHtml = require('./createHtml');

var _createHtml2 = _interopRequireDefault(_createHtml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function invitationReceived(byHandle, forId, ById) {
  var headline = byHandle + ' has invited you to join their tribe!';
  var mainText = 'Your friend is using BounceTribe to share their music and wants to collaborate with you.';
  var imgMainHref = _common.btUrlRoot + '/' + forId + '/acceptInvite/' + byId;
  var imgMainSrc = 'https://raw.githubusercontent.com/BounceTribe/bt-api/master/src/img/acceptInvite.png';

  return (0, _createHtml2.default)({ headline: headline, mainText: mainText, imgMainHref: imgMainHref, imgMainSrc: imgMainSrc });
}

//accept all friend requests on initial activation