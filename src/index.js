import "babel-polyfill"
import express from 'express'
import graphqlHTTP from 'express-graphql'
import bodyparser from 'body-parser'
// import schema from './schema'
// import authMiddleware from './authMiddleware'

const app = express()

let port = process.env.PORT || 3000

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


app.use('/notifications', (req, res, next) => {
  console.log(req.body)
})

const server = app.listen(app.get('port'), ()=>{
  console.log(`Server is running at port ${app.get('port')}`)
})
