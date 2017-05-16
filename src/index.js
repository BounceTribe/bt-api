import "babel-polyfill"
import express from 'express'
import bodyParser from 'body-parser'
import createNotification from './createNotification'

const app = express()

let port = process.env.PORT || 5000

app.set('port', port)



app.use(bodyParser.json())


const simple = 'https://api.graph.cool/simple/v1/bt-api'

app.use('/notifications', (req, res, next) => {
  let {author, project} = req.body.createdNode
  let {id: byId} = author
  let {id: forId} = project.creator
  let type = "PROJECT_COMMENT"

  createNotification({
    byId,
    forId,
    type
  })
  res()
})

const server = app.listen(app.get('port'), ()=>{
  console.log(`Server is running at port ${app.get('port')}`)
})
