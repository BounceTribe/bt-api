'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = projectFeedbackd;

var _common = require('./common');

var _createHtml = require('./createHtml');

var _createHtml2 = _interopRequireDefault(_createHtml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function projectFeedbackd(byHandle, forHandle, projectTitle) {

  var headline = 'Feedback Received!';
  var mainText = byHandle + ' liked your ' + projectTitle + ' project and bounced it to share with their tribe.';
  var imgMainHref = _common.btUrlRoot + '/' + forHandle + '/' + projectTitle;
  var imgMainSrc = 'https://raw.githubusercontent.com/BounceTribe/bt-api/master/src/img/viewProject.png';

  return (0, _createHtml2.default)({ headline: headline, mainText: mainText, imgMainHref: imgMainHref, imgMainSrc: imgMainSrc });
}