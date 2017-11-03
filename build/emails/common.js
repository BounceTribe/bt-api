"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var btHeadline = exports.btHeadline = function btHeadline(text) {
  return "\n  <mj-text\n    font-size=\"30px\"\n    font-weight=\"bold\"\n    color=\"#555555\"\n    align=\"center\"\n    font-family=\"helvetica\"\n    line-height=\"40px\"\n    padding-bottom=\"10px\"\n  >\n    " + text + "\n  </mj-text>\n";
};
var btMain = exports.btMain = function btMain(text) {
  return "\n  <mj-text\n    font-size=\"16px\"\n    color=\"#777777\"\n    align=\"center\"\n    font-family=\"helvetica\"\n    padding-bottom=\"20px\"\n  >\n    " + text + "\n  </mj-text>\n";
};

var btLogo = exports.btLogo = "<mj-image\n    width=\"130\"\n    padding-bottom=\"20px\"\n    src=\"http://bouncetribe.com/wp-content/uploads/2016/03/Logo-500.png\"\n  />";

var btMainButton = exports.btMainButton = function btMainButton(imgMainHref, imgMainSrc) {
  return "\n  <mj-image width=\"168\" href=\"" + imgMainHref + "\" src=\"" + imgMainSrc + "\" />\n";
};
var dividerUnSubscribe = exports.dividerUnSubscribe = "\n  <mj-divider border-width=\"1px\" border-style=\"dashed\" border-color=\"lightgrey\"/>\n    <mj-inline-links base-url=\"https://test.bouncetribe.com\">\n      <mj-link font-size=\"9px\"\n        color=\"#999999\"\n        font-family=\"helvetica\"\n        align=\"center\"\n        padding-bottom=\"20px\"\n        href=\"/" + handle + "/projects/unsubscribe\">\n          I don't want to receive these emails\n      </mj-link>\n    </mj-inline-links>\n  ";