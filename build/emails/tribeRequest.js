'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = tribeRequest;

var _common = require('./common');

var _createHtml = require('./createHtml');

var _createHtml2 = _interopRequireDefault(_createHtml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function tribeRequest(byHandle, byId, forId) {

  var headline = 'New Tribe Request!';
  var mainText = byHandle + ' has invited you to their tribe.';
  var imgMainHref = _common.btUrlRoot + '/acceptInvite/' + forId + '/' + byId;
  var imgMainSrc = 'https://raw.githubusercontent.com/BounceTribe/bt-api/master/src/img/acceptRequest.png';

  return (0, _createHtml2.default)({ headline: headline, mainText: mainText, imgMainHref: imgMainHref, imgMainSrc: imgMainSrc });
}

//accept all friend requests on initial activation