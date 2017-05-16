import "babel-polyfill"
import express from 'express'
import graphqlHTTP from 'express-graphql'
import bodyparser from 'body-parser'
import fetch from 'node-fetch'
// import schema from './schema'
// import authMiddleware from './authMiddleware'

const app = express()

let port = process.env.PORT || 5000

app.set('port', port)

app.use(bodyparser.json())


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

})

const server = app.listen(app.get('port'), ()=>{
  console.log(`Server is running at port ${app.get('port')}`)
})


async function createNotification({type, forId, byId}) {
  return fetch(simple, {
    method: 'POST',
    headers: {
        'content-type': 'application/json'
      },
    body: JSON.stringify({
      query: `
        mutation {
          createNotification (
            type: ${type}
            notificationForId: ${forId}
            triggeredById: ${byId}
          ) {
            id
          }
        }
      `
    }),
  }).then(response => response.json())
    .then(json => {
      console.log("json", json )
    })
}
