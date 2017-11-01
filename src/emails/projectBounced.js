import { mjml2html } from 'mjml'
import unSub from './unSub'

console.log('unsub', unSub);
export default function projectBounced(byHandle, forHandle, projectTitle, link){
  return mjml2html(`
    <mjml>
      <mj-body>
        <mj-container>
          <mj-section>
            <mj-column>

              <mj-image width="130" padding-bottom="20px" src="http://bouncetribe.com/wp-content/uploads/2016/03/Logo-500.png" />

              <mj-text font-size="30px" font-weight="bold" color="#555555" align="center" font-family="helvetica" line-height="40px" padding-bottom="10px">Project Bounced!</mj-text>

              <mj-text font-size="16px" color="#777777" align="center" font-family="helvetica" padding-bottom="20px">${byHandle} liked your ${projectTitle} project and bounced it to share with their tribe.</mj-text>

              <mj-text font-size="16px" color="#777777" align="center" font-family="helvetica" padding-bottom="20px"><a href="www.bouncetribe.com/${forHandle}/${projectTitle}">
                View Project
              </a></mj-text>

              <mj-divider border-width="1px" border-style="dashed" border-color="lightgrey" />

              ${unSub}

            </mj-column>
          </mj-section>
        </mj-container>
      </mj-body>
    </mjml>
  `)
}
