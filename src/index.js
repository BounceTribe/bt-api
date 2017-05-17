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
      forHandle
  let emailNotification = false
  let extra = ''

  switch (type) {
    case 'FRIENDS': {
      let {node} = data.FriendRequest
      if (node.accepted) {
        type = "FRIEND_REQUEST_ACCEPTED"
        byId = node.recipient.id
        forId = node.actor.id
        forHandle = node.actor.handle
        toEmail = node.actor.email
        emailNotification =  true
      } else {
        type = "FRIEND_REQUEST"
        byId = node.actor.id
        forId = node.recipient.id
      }
      break
    }
    case 'COMMENT': {
      let {node} = data.Comment
      byId = node.author.id
      forId = node.project.creator.id
      toEmail = node.project.creator.email
      forHandle = node.project.creator.handle
      if (node.session) {
        extra = `sessionId: "${node.session.id}"`
        type = 'SESSION_FEEDBACK_RECEIVED'
      } else if (node.project) {
        extra = `projectId: "${node.project.id}"`
        type = 'PROJECT_FEEDBACK_RECEIVED'
      }
      emailNotification =  true
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

  createNotification({
    byId,
    forId,
    type,
    extra
  })

  if (emailNotification) {
    sendEmail({
      toEmail,
      forHandle,
      type
    })
  }

  next()
})

const server = app.listen(app.get('port'), ()=>{
  console.log(`Server is running at port ${app.get('port')}`)
})
