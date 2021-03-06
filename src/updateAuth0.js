// import {} from 'dotenv/config'
import fetch from 'node-fetch'

const {auth0API, auth0Secret} = process.env

// const getCredToken = () => {
//   console.log('updatePassword', auth0UserId, newPass);
//   let url = `https://bouncetribe.auth0.com/api/v2/oauth/token`
//
//   let options = {
//     method: 'POST',
//     headers: { 'content-type': 'application/json' },
//     body: JSON.stringify({
//       grant_type: 'client_credentials',
//       client_id: '22XLjQyIPQV2Y2jQe4c7Qh-WqwUYcwNR',
//       client_secret: auth0Secret,
//       audience: 'https://bouncetribe.auth0.com/api/v2/'
//     })
//     // idToken: auth.getToken()
//   }
//
//   return new Promise( (resolve, reject) => {
//     fetch(url, options)
//     .then(result => result.json())
//     .then(response => {
//       resolve(response)
//     })
//   })
// }

export const setPass = ({newPass, auth0UserId}) => {
  let url = "https://bouncetribe.auth0.com/api/v2/users/" + auth0UserId

  let options = {
    method: "PATCH",
    body: JSON.stringify({ 'password': newPass }),
    headers: {
      Authorization: "Bearer " + auth0API,
      "Content-Type": "application/json"
    }
  }
  return new Promise( (resolve, reject) => {
    fetch(url, options)
    .then(result => result.json())
    .then(response => console.log('response', resolve(response)))
  } )
}

export const makeResourceServer = () => {
  let url = 'https://bouncetribe.auth0.com/api/v2/resource-servers'

  let options = {
    method: "POST",
    body: JSON.stringify({
      name: 'Bouncetribe API',
      identifier: 'https://bt-carl-api.herokuapp.com/',
      signing_alg: 'RS256',
      scopes:  [{value: 'resource_server'}]
    }),
    headers: {
      Authorization: "Bearer " + auth0API,
      "Content-Type": "application/json"
    },
    json: true
  }
  return new Promise( (resolve, reject) => {
    fetch(url, options)
    .then(result => result.json())
    .then(response => console.log('response', response))
  } )
}

export const getClientGrant = () => {
  let url = "https://bouncetribe.auth0.com/oauth/token"

  let options = {
    method: "POST",
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: '22XLjQyIPQV2Y2jQe4c7Qh-WqwUYcwNR',
      client_secret: auth0Secret,
      audience: 'https://bt-carl-api.herokuapp.com/' }), //TODO
    headers: {
      // Authorization: "Bearer " + auth0API,
      "Content-Type": "application/json"
    }
  }
  return new Promise( (resolve, reject) => {
    fetch(url, options)
    .then(result => result.json())
    .then(response => console.log('response', response))
  } )
}


export const testQuery = (auth0UserId) => {
  let url = "https://bouncetribe.auth0.com/api/v2/users?q=email.raw%3A%22subliminal_lime%40hotmail.com%22&search_engine=v2"
  let options = {
    method: "GET",
    // body: JSON.stringify({ 'password': newPass }),
    // body: { q: 'email.raw:"holesinabarrel@gmail.com"', search_engine: 'v2' },
    headers: {
      Authorization: "Bearer " + auth0API,
      "Content-Type": "application/json"
    }
  }
  return new Promise( (resolve, reject) => {
    fetch(url, options)
    .then(result => result.json())
    .then(response => console.log('response', response))
  } )
}


// export default setPass


// fetch("https://bouncetribe.auth0.com/api/v2/resource-servers", {
//   body: "{"name":"My Sample API","identifier": "https://my-api-urn","signing_alg": "RS256","scopes": [{ "value": "sample-scope", "description": "Description for Sample Scope"}]}",
//   headers: {
//     authorization: "Bearer " + auth0API,
//     "content-type": "application/json",
//     "Content-Type": "application/x-www-form-urlencoded"
//   },
//   method: "POST"
// })
