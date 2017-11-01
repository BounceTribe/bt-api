'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = projectBounced;

var _mjml = require('mjml');

var _common = require('./common');

console.log('unsub', _common.unSub);
function projectBounced(byHandle, forHandle, projectTitle) {
  return (0, _mjml.mjml2html)('\n    <mjml>\n      <mj-body>\n        <mj-container>\n          <mj-section>\n            <mj-column>\n\n              ' + _common.btLogo + '\n\n              <mj-text font-size="30px" font-weight="bold" color="#555555" align="center" font-family="helvetica" line-height="40px" padding-bottom="10px">Project Bounced!</mj-text>\n\n              <mj-text font-size="16px" color="#777777" align="center" font-family="helvetica" padding-bottom="20px">' + byHandle + ' liked your ' + projectTitle + ' project and bounced it to share with their tribe.</mj-text>\n\n              <mj-image width="168" href="www.test.bouncetribe.com/' + forHandle + '/' + projectTitle + '" src="https://raw.githubusercontent.com/BounceTribe/bt-api/master/src/img/viewProject.png" />\n\n\n              <mj-divider border-width="1px" border-style="dashed" border-color="lightgrey" />\n\n              ' + _common.unSub + '\n\n            </mj-column>\n          </mj-section>\n        </mj-container>\n      </mj-body>\n    </mjml>\n  ');
}