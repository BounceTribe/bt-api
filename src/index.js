import "babel-polyfill"
import express from 'express'
import bodyParser from 'body-parser'
import createNotification from './createNotification'

const app = express()

let port = process.env.PORT || 5000

app.set('port', port)



app.use(bodyParser.json())


const simple = 'https://api.graph.cool/simple/v1/bt-api'

app.use('/notifications/:type', (req, res, next) => {
  console.log("req.params", req.params )
  // let {author, project} = req.body.createdNode
  // let {id: byId} = author
  // let {id: forId} = project.creator
  let {createdNode: node} = req.body
  let {type} = req.params
  let byId,
      forId
  let sendEmail = false

  switch (type) {
    case 'FRIEND_REQUEST': {
      byId = node.author.id
      forId = node.project.creator.id
      break
    }
    case 'FRIEND_REQUEST_ACCEPTED': {
      break

    }
    case 'PROJECT_FEEDBACK_RECEIVED': {
      break

    }
    case 'SESSION_FEEDBACK_RECEIVED': {
      break

    }
    case 'SESSION_FEEDBACK_APPRECIATED': {
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
    type
  })
  next()
})

const server = app.listen(app.get('port'), ()=>{
  console.log(`Server is running at port ${app.get('port')}`)
})
