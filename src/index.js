import "babel-polyfill"
import express from 'express'
import bodyParser from 'body-parser'
import createNotification from './createNotification'

const app = express()

let port = process.env.PORT || 5000

app.set('port', port)



app.use(bodyParser.json())



app.use('/notifications/:type', (req, res, next) => {
  let {data} = req.body
  let {type} = req.params
  let byId,
      forId
  let sendEmail = false
  let extra = ''

  switch (type) {
    case 'FRIENDS': {
      let {node} = data.FriendRequest
      console.log("node", node )
      if (node.accepted) {
        type = "FRIEND_REQUEST_ACCEPTED"
        byId = node.recipient.id
        forId = node.actor.id
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
      if (node.session) {
        extra = `sessionId: "${node.session.id}"`
        type = 'SESSION_FEEDBACK_RECEIVED'
      } else if (node.project) {
        extra = `projectId: "${node.project.id}"`
        type = 'PROJECT_FEEDBACK_RECEIVED'
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

  createNotification({
    byId,
    forId,
    type,
    extra
  })
  next()
})

const server = app.listen(app.get('port'), ()=>{
  console.log(`Server is running at port ${app.get('port')}`)
})
