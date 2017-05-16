import "babel-polyfill"
import express from 'express'
import graphqlHTTP from 'express-graphql'
import bodyParser from 'body-parser'
import fetch from 'node-fetch'
import createNotification from './createNotification'
// import schema from './schema'
// import authMiddleware from './authMiddleware'

const app = express()

let port = process.env.PORT || 5000

app.set('port', port)

app.use(bodyParser.urlencoded({ extended: false }))


app.use(bodyParser.json())


// app.use('*', graphqlHTTP((req) =>{
//   console.log("req", req )
//   console.log("req.body", req.body )
//   return {
//     schema: schema,
//     graphiql: true,
//   }
// }))


const simple = 'https://api.graph.cool/simple/v1/bt-api'

app.use('/notifications', (req, res, next) => {
  console.log("req.body", req.body )
  console.log(typeof req.body)
  console.log(req.body.data)
  console.log(req.body.valueOf())
  let {author, project} = req.body.createdNode
  let {id: byId} = createdNode.author
  let {id: forId} = createdNode.project.creator
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
