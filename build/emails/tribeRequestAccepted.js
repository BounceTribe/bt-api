'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = tribeRequestAccepted;

var _common = require('./common');

var _createHtml = require('./createHtml');

var _createHtml2 = _interopRequireDefault(_createHtml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function tribeRequestAccepted(byHandle, forHandle) {

    var headline = 'Tribe Request Accepted!';
    var mainText = byHandle + ' has joined your tribe.';
    var imgMainHref = _common.btUrlRoot + '/tribe/' + forHandle;
    var imgMainSrc = 'https://raw.githubusercontent.com/BounceTribe/bt-api/master/src/img/viewTribe.png';

    return (0, _createHtml2.default)({ headline: headline, mainText: mainText, imgMainHref: imgMainHref, imgMainSrc: imgMainSrc });
}

//accept all friend requests on initial activation