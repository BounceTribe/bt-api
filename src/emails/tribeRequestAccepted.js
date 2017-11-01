import { btUrlRoot } from './common'
import createHtml from './createHtml'

export default function tribeRequestAccepted(byHandle, forHandle ){

    let headline = 'Tribe Request Accepted!'
    let mainText = `${byHandle} has joined your tribe.`
    let imgMainHref = `${btUrlRoot}/tribe/${forHandle}`
    let imgMainSrc = `https://raw.githubusercontent.com/BounceTribe/bt-api/master/src/img/viewTribe.png`

    return createHtml({headline, mainText, imgMainHref, imgMainSrc})

}

//accept all friend requests on initial activation
