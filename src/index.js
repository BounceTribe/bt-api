import "babel-polyfill"
import express from 'express'
import bodyParser from 'body-parser'
import createNotification from './createNotification'
import sendEmail from './emails'

const app = express()

let port = process.env.PORT || 5000

app.set('port', port)



app.use(bodyParser.json())



app.use('/notifications/:type', (req, res, next) => {
  let {data} = req.body
  let {type} = req.params
  let byId,
      forId,
      toEmail,
      byHandle,
      sessionId,
      projectTitle
  let emailNotification = true
  let sendNotification = true
  let extra = ''

  switch (type) {
    case 'FRIENDS': {
      let {node} = data.FriendRequest
      if (node.accepted) {
        type = "FRIEND_REQUEST_ACCEPTED"
        byId = node.recipient.id
        forId = node.actor.id

      } else {
        type = "FRIEND_REQUEST"
        byId = node.actor.id
        forId = node.recipient.id
        byHandle = node.recipient.handle
        toEmail = node.recipient.email
      }
      break
    }
    case 'COMMENT': {
      let {node} = data.Comment
      byId = node.author.id
      forId = node.project.creator.id
      toEmail = node.project.creator.email
      byHandle = node.author.handle
      if (node.session) {
        extra = `sessionId: "${node.session.id}"`
        type = 'SESSION_FEEDBACK_RECEIVED'
        sessionId = node.session.id
      } else if (node.project) {
        extra = `projectId: "${node.project.id}"`
        type = 'PROJECT_FEEDBACK_RECEIVED'
        projectTitle = node.project.title
      }
      let existingComment = node.project.comments.filter( (comment) => {
        return comment.author.id === byId
      })
      console.log("existingComment", existingComment)

      if (existingComment.length > 1) {
        emailNotification = false
        sendNotification = false
      }
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

  if (sendNotification) {
    createNotification({
      byId,
      forId,
      type,
      extra
    })

  }

  console.log("emailNotification", emailNotification )
  if (emailNotification) {
    sendEmail({
      toEmail,
      byHandle,
      type,
      projectTitle,
      sessionId
    })
  }

  next()
})

const server = app.listen(app.get('port'), ()=>{
  console.log(`Server is running at port ${app.get('port')}`)
})
