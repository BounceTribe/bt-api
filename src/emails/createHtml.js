
import { mjml2html } from 'mjml'
import { btLogo, dividerUnSubscribe, btUrlRoot, btHeadline, btMain, btMainButton } from './common'

export const createHtml = ({headline, mainText, imgMainHref, imgMainSrc, toHandle}) =>
  mjml2html(`
    <mjml>
      <mj-body>
        <mj-container>
          <mj-section>
            <mj-column>

              ${btLogo}
              ${btHeadline(headline)}
              ${btMain(mainText)}
              ${btMainButton(imgMainHref, imgMainSrc)}

              ${dividerUnSubscribe},

            </mj-column>
          </mj-section>
        </mj-container>
      </mj-body>
    </mjml>
  `)
