'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createHtml = undefined;

var _mjml = require('mjml');

var _common = require('./common');

var createHtml = exports.createHtml = function createHtml(_ref) {
  var headline = _ref.headline,
      mainText = _ref.mainText,
      imgMainHref = _ref.imgMainHref,
      imgMainSrc = _ref.imgMainSrc;
  return (0, _mjml.mjml2html)('\n    <mjml>\n      <mj-body>\n        <mj-container>\n          <mj-section>\n            <mj-column>\n\n              ' + _common.btLogo + '\n              ' + (0, _common.btHeadline)(headline) + '\n              ' + (0, _common.btMain)(mainText) + '\n              ' + (0, _common.btMainButton)(imgMainHref, imgMainSrc) + '\n\n              ' + _common.dividerUnSubscribe + '\n\n            </mj-column>\n          </mj-section>\n        </mj-container>\n      </mj-body>\n    </mjml>\n  ');
};