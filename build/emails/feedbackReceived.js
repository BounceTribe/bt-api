"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = feedbackReceived;
var mjml = function mjml(byHandle, link, forHandle) {
  return "\n  <mjml>\n    <mj-body>\n      <mj-container>\n        <mj-section>\n          <mj-column>\n\n            <mj-text font-size=\"30px\" font-weight=\"bold\" color=\"#555555\" font-family=\"helvetica\" line-height=\"40px\" padding-bottom=\"10px\">Feedback Received!</mj-text>\n\n            <mj-text font-size=\"16px\" color=\"#777777\" font-family=\"helvetica\" padding-bottom=\"20px\">" + byHandle + " has given you some feedback. See what they had to say.</mj-text>\n\n            <mj-button inner-padding=\"16px 30px\" font-size=\"15px\" font-family=\"Helvetica, Arial\" align=\"left\" background-color=\"#9075F3\" color=\"white\" href=\"https://test.bouncetribe.com/" + forHandle + "/" + link + "\">\n              View Feedback\n            </mj-button>\n\n          </mj-column>\n        </mj-section>\n      </mj-container>\n    </mj-body>\n  </mjml>\n";
};

function feedbackReceived(handle, link, forHandle) {
  return "\n  <!doctype html>\n  <html xmlns=\"http://www.w3.org/1999/xhtml\" xmlns:v=\"urn:schemas-microsoft-com:vml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\">\n\n  <head>\n    <title></title>\n    <!--[if !mso]><!-- -->\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n    <!--<![endif]-->\n    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <style type=\"text/css\">\n      #outlook a {\n        padding: 0;\n      }\n\n      .ReadMsgBody {\n        width: 100%;\n      }\n\n      .ExternalClass {\n        width: 100%;\n      }\n\n      .ExternalClass * {\n        line-height: 100%;\n      }\n\n      body {\n        margin: 0;\n        padding: 0;\n        -webkit-text-size-adjust: 100%;\n        -ms-text-size-adjust: 100%;\n      }\n\n      table,\n      td {\n        border-collapse: collapse;\n        mso-table-lspace: 0pt;\n        mso-table-rspace: 0pt;\n      }\n\n      img {\n        border: 0;\n        height: auto;\n        line-height: 100%;\n        outline: none;\n        text-decoration: none;\n        -ms-interpolation-mode: bicubic;\n      }\n\n      p {\n        display: block;\n        margin: 13px 0;\n      }\n    </style>\n    <!--[if !mso]><!-->\n    <style type=\"text/css\">\n      @media only screen and (max-width:480px) {\n        @-ms-viewport {\n          width: 320px;\n        }\n        @viewport {\n          width: 320px;\n        }\n      }\n    </style>\n    <!--<![endif]-->\n    <!--[if mso]>\n  <xml>\n    <o:OfficeDocumentSettings>\n      <o:AllowPNG/>\n      <o:PixelsPerInch>96</o:PixelsPerInch>\n    </o:OfficeDocumentSettings>\n  </xml>\n  <![endif]-->\n    <!--[if lte mso 11]>\n  <style type=\"text/css\">\n    .outlook-group-fix {\n      width:100% !important;\n    }\n  </style>\n  <![endif]-->\n    <style type=\"text/css\">\n      @media only screen and (min-width:480px) {\n        .mj-column-per-100 {\n          width: 100%!important;\n        }\n      }\n    </style>\n  </head>\n\n  <body>\n    <div>\n      <!--[if mso | IE]>\n        <table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\" align=\"center\" style=\"width:600px;\">\n          <tr>\n            <td style=\"line-height:0px;font-size:0px;mso-line-height-rule:exactly;\">\n        <![endif]-->\n      <div style=\"margin:0px auto;max-width:600px;\">\n        <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" style=\"font-size:0px;width:100%;\" align=\"center\" border=\"0\">\n          <tbody>\n            <tr>\n              <td style=\"text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:20px 0px;\">\n                <!--[if mso | IE]>\n        <table role=\"presentation\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"><tr><td style=\"vertical-align:top;width:600px;\">\n        <![endif]-->\n                <div class=\"mj-column-per-100 outlook-group-fix\" style=\"vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;\">\n                  <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" border=\"0\">\n                    <tbody>\n                      <tr>\n                        <td style=\"word-wrap:break-word;font-size:0px;padding:10px 25px;padding-bottom:10px;\" align=\"left\">\n                          <div class=\"\" style=\"cursor:auto;color:#555555;font-family:helvetica;font-size:30px;font-weight:bold;line-height:40px;text-align:left;\">Feedback Received!</div>\n                        </td>\n                      </tr>\n                      <tr>\n                        <td style=\"word-wrap:break-word;font-size:0px;padding:10px 25px;padding-bottom:20px;\" align=\"left\">\n                          <div class=\"\" style=\"cursor:auto;color:#777777;font-family:helvetica;font-size:16px;line-height:22px;text-align:left;\">" + handle + " has given you some feedback. See what they had to say.</div>\n                        </td>\n                      </tr>\n                      <tr>\n                        <td style=\"word-wrap:break-word;font-size:0px;padding:10px 25px;\" align=\"left\">\n                          <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:separate;\" align=\"left\" border=\"0\">\n                            <tbody>\n                              <tr>\n                                <td style=\"border:none;border-radius:3px;color:white;cursor:auto;padding:16px 30px;\" align=\"center\" valign=\"middle\" bgcolor=\"#9075F3\"><a href=\"https://test.bouncetribe.com/" + forHandle + "/" + link + "\" style=\"text-decoration:none;line-height:100%;background:#9075F3;color:white;font-family:Helvetica, Arial;font-size:15px;font-weight:normal;text-transform:none;margin:0px;\"\n                                    target=\"_blank\">View Feedback</a></td>\n                              </tr>\n                            </tbody>\n                          </table>\n                        </td>\n                      </tr>\n                    </tbody>\n                  </table>\n                </div>\n                <!--[if mso | IE]>\n        </td></tr></table>\n        <![endif]-->\n              </td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n      <!--[if mso | IE]>\n        </td></tr></table>\n        <![endif]-->\n    </div>\n  </body>\n\n  </html>\n  ";
}