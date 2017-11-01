import { btUrlRoot } from './common'
import createHtml from './createHtml'

export default function invitationReceived( byHandle, forId, ById ){
  let headline = `${byHandle} has invited you to join their tribe!`
  let mainText = `Your friend is using BounceTribe to share their music and wants to collaborate with you.`
  let imgMainHref = `${btUrlRoot}/${forId}/acceptInvite/${byId}`
  let imgMainSrc =   `https://raw.githubusercontent.com/BounceTribe/bt-api/master/src/img/acceptInvite.png`

  return createHtml({headline, mainText, imgMainHref, imgMainSrc})
}

//accept all friend requests on initial activation
