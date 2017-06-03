import Mailgun from 'mailgun-js'
import feedbackReceived from './feedbackReceived'
import friendRequestAccepted from './friendRequestAccepted'


const domain = 'mail.bouncetribe.com'
const {mailgunKey: apiKey} = process.env
const mailgun = new Mailgun({apiKey, domain})

export default function sendEmail({toEmail,byHandle,type, projectTitle, sessionId}) {

  let html = ''
  let subject = ''
  console.log("type", type)
  switch (type) {
    case 'FRIEND_REQUEST': {
      html = friendRequestAccepted(byHandle)
      subject = 'Friend Request Accepted'
      break
    }
    case 'FRIEND_REQUEST_ACCEPTED': {
      html = friendRequestAccepted(byHandle)
      subject = 'Friend Request Accepted'
      break
    }
    case 'PROJECT_FEEDBACK_RECEIVED':{
      html = feedbackReceived(byHandle, projectTitle)
      subject = 'Feedback Received'
      break
    }
    case 'SESSION_FEEDBACK_RECEIVED': {
      html = feedbackReceived(byHandle, sessionId)
      subject = 'Feedback Received'
      break
    }
    case 'FB_FRIEND_JOINED': {
      break

    }
    case 'MESSAGE': {
      break

    }
    case 'BOUNCED': {
      break

    }
    default: {

    }
  }

  console.log("html", html )
  console.log("toEmail", toEmail )

  if (html) {
    mailgun.messages().send({
       from: "BounceTribe <hello@bouncetribe.com>",
       to: toEmail,
       html,
       subject
     }, (error, body) => {
      if (error) {
        console.log(error)
      }
      console.log('body', body)

    })
  }
}
