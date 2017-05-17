import Mailgun from 'mailgun-js'
import feedbackReceived from './feedbackReceived'
import friendRequestAccepted from './friendRequestAccepted'


const domain = 'mail.bouncetribe.com'
const {mailgunKey} = process.env
const mailgun = new Mailgun({mailgunKey, domain})

export default function sendEmail({toEmail,forHandle,type}) {

  let html = ''
  let subject = ''
  switch (type) {
    case 'FRIEND_REQUEST': {
      break
    }
    case 'FRIEND_REQUEST_ACCEPTED': {
      html = friendRequestAccepted(forHandle)
      subject = 'Friend Request Accepted'
      break
    }
    case 'PROJECT_FEEDBACK_RECEIVED':
    case 'SESSION_FEEDBACK_RECEIVED': {
      html = feedbackReceived(forHandle)
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

  if (html) {
    mailgun.messages().send({
       from: "hello@bouncetribe.com",
       to: toEmail,
       html,
       subject
     }, (error, body) => {
      if (error) {
        console.log(error)
      }
    })
  }
}
