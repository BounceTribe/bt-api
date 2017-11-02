import Mailgun from 'mailgun-js'
import feedbackReceived from './feedbackReceived'
import invitationReceived from './invitationReceived'
import friendRequestAccepted from './friendRequestAccepted'
import projectBounced from './projectBounced'
import {} from 'dotenv/config'
import {createHtml} from './createHtml'

const mailDomain = 'mail.bouncetribe.com'
const siteDomain = `test.bouncetribe.com`
const {mailgunKey: apiKey} = process.env
const mailgun = new Mailgun({apiKey, mailDomain})

let headline, mainText, imgMainHref, imgMainSrc

export default function sendEmail(props) {

  console.log('sendemail props', props);
  let {toEmail, byHandle, type, projectTitle, forHandle, urlCode, byId, forId} = props
  let subject = ''

  switch (type) {

    case 'TRIBE_REQUEST': {
      subject= 'New Tribe Request'
      headline = 'New Tribe Request!'
      mainText = `${byHandle} has invited you to their tribe.`
      imgMainHref =`${siteDomain}/acceptInvite/tribe/${forId}/${byId}` //TODO
      imgMainSrc  = `https://raw.githubusercontent.com/BounceTribe/bt-api/master/src/img/acceptRequest.png`
      break
    }

    case 'TRIBE_REQUEST_ACCEPTED': {
      subject = 'Tribe Request Accepted'
      headline = 'Tribe Request Accepted!'
      mainText = `${byHandle} has joined your tribe.`
      imgMainHref = `${siteDomain}/tribe/${forHandle}`
      imgMainSrc = `https://raw.githubusercontent.com/BounceTribe/bt-api/master/src/img/viewTribe.png`
      break
    }

    case 'PROJECT_FEEDBACK_RECEIVED':{
      headline = 'Feedback Received!'
      mainText = `${byHandle} liked your ${projectTitle} project and bounced it to share with their tribe.`
      imgMainHref =`${siteDomain}/${forHandle}/${projectTitle}`
      imgMainSrc  = `https://raw.githubusercontent.com/BounceTribe/bt-api/master/src/img/viewProject.png`
      subject = 'Feedback Received'
      break
    }

    case 'BOUNCED': {
      subject = 'Project Bounced'
      headline = 'Project Bounced!'
      mainText = `${byHandle} liked your ${projectTitle} project and bounced it to share with their tribe.`
      imgMainHref =`${siteDomain}/${forHandle}/${projectTitle}`
      imgMainSrc  = `https://raw.githubusercontent.com/BounceTribe/bt-api/master/src/img/viewProject.png`
      break
    }

    case 'INVITATION_RECEIVED': {
      subject = 'BounceTribe Invitation Received'
      headline = `${byHandle} has invited you to join their tribe!`
      mainText = `Your friend is using BounceTribe to share their music and wants to collaborate with you.`
      imgMainHref = `${siteDomain}/${forId}/acceptInvite/join/${byId}` //TODO
      imgMainSrc =   `https://raw.githubusercontent.com/BounceTribe/bt-api/master/src/img/acceptInvite.png`
      break
    }

    default: {
      console.log('unknown email type', props)
    }
  }

  let generatedHtml = createHtml({headline, mainText, imgMainHref, imgMainSrc})
  // console.log('gen', generatedHtml);
  if (!generatedHtml.errors.length) {
    console.log('MAILGUN',toEmail, subject);
    mailgun.messages().send({
       from: "BounceTribe <hello@bouncetribe.com>",
       to: toEmail,
       html: generatedHtml.html,
       subject
     }, (error, body) => {
      if (error) {
        console.log('mailgun error', error)
      } else {
        console.log('eb', error, body);
      }

    })
  } else {
    console.log('email error', generatedHtml.errors)
  }
}
