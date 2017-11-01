import { mjml2html } from 'mjml'
import { btLogo, unSub } from './common'

console.log('unsub', unSub);
export default function projectBounced(byHandle, forHandle, projectTitle){
  console.log('byHandle, forHandle, projectTitle', byHandle, forHandle, projectTitle);
  return mjml2html(`
    <mjml>
      <mj-body>
        <mj-container>
          <mj-section>
            <mj-column>

              ${btLogo}

              <mj-text font-size="30px" font-weight="bold" color="#555555" align="center" font-family="helvetica" line-height="40px" padding-bottom="10px">Project Bounced!</mj-text>

              <mj-text font-size="16px" color="#777777" align="center" font-family="helvetica" padding-bottom="20px">${byHandle} liked your ${projectTitle} project and bounced it to share with their tribe.</mj-text>

              <mj-image width="168" href="www.test.bouncetribe.com/${forHandle}/${projectTitle}" src="https://raw.githubusercontent.com/BounceTribe/bt-api/master/src/img/viewProject.png" />


              <mj-divider border-width="1px" border-style="dashed" border-color="lightgrey" />

              ${unSub}

            </mj-column>
          </mj-section>
        </mj-container>
      </mj-body>
    </mjml>
  `)
}
