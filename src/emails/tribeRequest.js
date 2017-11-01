import { btUrlRoot } from './common'
import createHtml from './createHtml'

export default function tribeRequest(byHandle, byId, forId ){


  let headline = 'New Tribe Request!'
  let mainText = `${byHandle} has invited you to their tribe.`
  let imgMainHref =`${btUrlRoot}/acceptInvite/${forId}/${byId}`
  let imgMainSrc  = `https://raw.githubusercontent.com/BounceTribe/bt-api/master/src/img/acceptRequest.png`

  return createHtml({headline, mainText, imgMainHref, imgMainSrc})
}

//accept all friend requests on initial activation
