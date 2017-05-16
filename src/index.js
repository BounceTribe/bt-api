import "babel-polyfill"
import express from 'express'
import bodyParser from 'body-parser'
import createNotification from './createNotification'

const app = express()

let port = process.env.PORT || 5000

app.set('port', port)



app.use(bodyParser.json())



app.use('/notifications/:type', (req, res, next) => {
  console.log("req.params", req.params, req.body )
  let {data} = req.body
  let {type} = req.params
  let byId,
      forId
  let sendEmail = false

  switch (type) {
    case 'FRIEND_REQUEST': {

      break
    }
    case 'FRIEND_REQUEST_ACCEPTED': {
      break

    }
    case 'PROJECT_FEEDBACK_RECEIVED': {
      let {node} = data.Comment
      byId = node.author.id
      forId = node.project.creator.id
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
