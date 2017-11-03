import "babel-polyfill"
import express from 'express'
import bodyParser from 'body-parser'
import createNotification from './createNotification'
import sendEmail from './emails'
import cors from 'cors'
import Spotify from 'spotify-web-api-node'

const app = express()

let port = process.env.PORT || 5000

app.set('port', port)

app.use(cors())

app.use(bodyParser.json())

const spotify = new Spotify({
  clientId : '6b96fc2eae0c494fb5b02514b70c436f',
  clientSecret : process.env.spotifySecret,
})

let expiration = Date.now()

function refreshCredentials() {
  return new Promise( (resolve, reject) => {
    spotify.clientCredentialsGrant().then(
      (resp) => {
        spotify.setAccessToken(resp.body['access_token'])
        expiration = Date.now() + 3000000
        resolve()
      },
      (error) => {
        console.log("error", error )
      }
    )
  })
}

function searchArtists(query) {
  return new Promise( (resolve, reject) => {
    spotify.searchArtists(query).then(
      (resp) => {
        let options = resp.body.artists.items.map((artist) => {
          return {
            value: {
              spotifyId: artist.id,
              imageUrl: (artist.images.length > 0) ? artist.images[0].url : '',
              influenceId: false,
              id: false
            },
            label: artist.name
          }
        })
        resolve({options})
      },
      (error) => {
        console.log("error", error)
      }
    )
  })
}

app.use('/artists', (req, res, next) => {
  let {query} = req.body
  if (expiration <= Date.now()) {
    refreshCredentials().then(() => {
      searchArtists(query).then(
        (options) => {
          res.send(options)
        }
      )
    })
  } else {
    searchArtists(query).then(
      (options) => {
        res.send(options)
      }
    )
  }
})

app.use('/email', (req, res, next) => {
  let {toEmail, byHandle, byId} = req.body.query
  let type = 'INVITATION_RECEIVED'
  let urlCode = ''
  console.log('email Invitiation to:', toEmail)
  sendEmail({toEmail, byHandle, type, byId, urlCode})
  res.send()
})

app.use('/notifications/:type', (req, res, next) => {
  let {data} = req.body
  let {type} = req.params
  let byId,
      forId,
      toEmail,
      byHandle,
      sessionId,
      projectTitle,
      forHandle
  let emailNotification = false
  let sendNotification = true
  let extra = ''
  let urlCode = ''

  switch (type) {
    case 'FRIENDS': {
      let {node} = data.FriendRequest
      if (node.accepted) {
        type = "TRIBE_REQUEST_ACCEPTED"
        byId = node.recipient.id
        byHandle = node.recipient.handle
        forHandle = node.actor.handle
        forId = node.actor.id
        toEmail = node.actor.email
        if (!node.actor.doNotEmailTA) emailNotification = true

      } else {
        type = "TRIBE_REQUEST"
        byId = node.actor.id
        byHandle = node.actor.handle
        forId = node.recipient.id
        forHandle = node.recipient.handle
        toEmail = node.recipient.email
        if (!node.recipient.doNotEmailTR) emailNotification = true
      }
      break
    }
    case 'COMMENT': {
      type = 'PROJECT_FEEDBACK_RECEIVED'
      let {node} = data.Comment
      console.log('COMMENT NODE', node);
      toEmail = node.project.creator.email
      forHandle = node.project.creator.handle
      forId = node.project.creator.id
      byHandle = node.author.handle
      byId = node.author.id
      extra = `projectId: "${node.project.id}"`
      projectTitle = node.project.title
      let existingComment = node.project.comments.filter( (comment) =>
        comment.author.id === byId
      )
      console.log('existingComment', existingComment[0]);
      if (!node.project.creator.doNotEmailPR /*&& existingComment.length > 1*/)
        emailNotification = true
      break

    }
    case 'BOUNCED': {
      let {node} = data.Bounce
      let {creator} = node.project
      byId = node.bouncer.id
      forId = creator.id
      toEmail = creator.email
      forHandle = creator.handle
      byHandle = node.bouncer.handle
      extra = `projectId: "${node.project.id}"`
      type = 'BOUNCED'
      if (!creator.doNotEmailPB) emailNotification = true

      // if bounce deleted?
      // if (existingComment.length > 1) {
      //   emailNotification = false
      //   sendNotification = false
      // }
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


  if (emailNotification) {
    sendEmail({
      toEmail,
      byHandle,
      type,
      projectTitle,
      sessionId,
      forHandle,
      byId,
      urlCode
    })
  }


  next()
})
// sendEmail({type: "BOUNCED",
//   forHandle: 'subliminal_lime',
//   toEmail: "holesinabarrel@gmail.com",
//   byHandle: "someoneelse",
//   projectTitle: "tree heart"})
const server = app.listen(app.get('port'), ()=>{
  console.log(`Server is running at port ${app.get('port')}`)
})
