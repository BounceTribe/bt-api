'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = projectBounced;

var _mjml = require('mjml');

var _common = require('./common');

function projectBounced(byHandle, forHandle, projectTitle) {

  var headline = 'Project Bounced!';
  var main = byHandle + ' liked your ' + projectTitle + ' project and bounced it to share with their tribe.';
  var imgMainHref = _common.btUrlRoot + '/' + forHandle + '/' + projectTitle;
  var imgMainSrc = 'https://raw.githubusercontent.com/BounceTribe/bt-api/master/src/img/viewProject.png';

  return (0, _mjml.mjml2html)('\n    <mjml>\n      <mj-body>\n        <mj-container>\n          <mj-section>\n            <mj-column>\n\n              ' + _common.btLogo + '\n              ' + (0, _common.btHeadline)(headline) + '\n              ' + (0, _common.btMain)(main) + '\n              ' + (0, _common.btMainButton)(ingHref, imgMainSrc) + '\n              ' + _common.divider + '\n              ' + _common.unSub + '\n\n            </mj-column>\n          </mj-section>\n        </mj-container>\n      </mj-body>\n    </mjml>\n  ').html;
}