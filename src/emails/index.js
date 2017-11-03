import Mailgun from 'mailgun-js'
// import {} from 'dotenv/config'
import {createHtml} from './createHtml'

const siteDomain = 'https://test.bouncetribe.com'
const domain = 'mail.bouncetribe.com'
const {mailgunKey: apiKey} = process.env
const mailgun = new Mailgun({apiKey, domain})

export default function sendEmail({toEmail, byHandle, type, projectTitle, sessionId, forHandle, urlCode}) {
  console.log('emailSend', {toEmail, byHandle, type, projectTitle, sessionId, forHandle, urlCode});
  let headline, mainText, imgMainHref, imgMainSrc, html, subject
  switch (type) {

    case 'TRIBE_REQUEST': {
      subject= 'New Tribe Request'
      headline = 'New Tribe Request!'
      mainText = `${byHandle} has invited you to their tribe.`
      imgMainHref =`${siteDomain}/acceptInvite/tribe/${forId}/${byId}` //TODO
      imgMainSrc  = `http://bouncetribe.com/wp-content/uploads/2017/11/Accept-Request-btn.png`
      break
    }

    case 'TRIBE_REQUEST_ACCEPTED': {
      subject = 'Tribe Request Accepted'
      headline = 'Tribe Request Accepted!'
      mainText = `${byHandle} has joined your tribe.`
      imgMainHref = `${siteDomain}/tribe/${forHandle}`
      imgMainSrc = `http://bouncetribe.com/wp-content/uploads/2017/11/View-My-Tribe-btn.png`
      break
    }

    case 'PROJECT_FEEDBACK_RECEIVED':{
      headline = 'Feedback Received!'
      mainText = `${byHandle} liked your ${projectTitle} project and bounced it to share with their tribe.`
      imgMainHref =`${siteDomain}/${forHandle}/${projectTitle}`
      imgMainSrc  = `http://bouncetribe.com/wp-content/uploads/2017/11/View-Feedback-btn.png`
      subject = 'Feedback Received'
      break
    }

    case 'BOUNCED': {
      subject = 'Project Bounced'
      headline = 'Project Bounced!'
      mainText = `${byHandle} liked your ${projectTitle} project and bounced it to share with their tribe.`
      imgMainHref =`${siteDomain}/${forHandle}/${projectTitle}`
      imgMainSrc  = `http://bouncetribe.com/wp-content/uploads/2017/11/View-Project-btn.png`
      break
    }

    case 'INVITATION_RECEIVED': {
      subject = 'BounceTribe Invitation Received'
      headline = `${byHandle} has invited you to join their tribe!`
      mainText = `Your friend is using BounceTribe to share their music and wants to collaborate with you.`
      imgMainHref = `${siteDomain}/acceptinvite/${forId}/${byId}` //TODO
      imgMainSrc =   `http://bouncetribe.com/wp-content/uploads/2017/11/Accept-Request-btn.png`
      break
    }

    default: {
      console.log('unknown email type')
    }
  }

  let generatedHtml = createHtml({headline, mainText, imgMainHref, imgMainSrc, forHandle})

  html = generatedHtml.html

  if (html) {
    mailgun.messages().send({
       from: "BounceTribe <hello@bouncetribe.com>",
       to: toEmail,
       html,
       subject
     }, (error, body) => {
      if (error) {
        console.log('email error:', error)
      } else {
        console.log('mailgun result:', body);
      }

    })
  }
}
