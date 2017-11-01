import { btUrlRoot } from './common'
import createHtml from './createHtml'

export default function projectFeedbackd(byHandle, forHandle, projectTitle){

  let headline = 'Feedback Received!'
  let mainText = `${byHandle} liked your ${projectTitle} project and bounced it to share with their tribe.`
  let imgMainHref =`${btUrlRoot}/${forHandle}/${projectTitle}`
  let imgMainSrc  = `https://raw.githubusercontent.com/BounceTribe/bt-api/master/src/img/viewProject.png`


  return createHtml({headline, mainText, imgMainHref, imgMainSrc})

}
