
 export const btHeadline = text => `
  <mj-text
    font-size="30px"
    font-weight="bold"
    color="#555555"
    align="center"
    font-family="helvetica"
    line-height="40px"
    padding-bottom="10px"
  >
    ${text}
  </mj-text>
`
export const btMain = text =>`
  <mj-text
    font-size="16px"
    color="#777777"
    align="center"
    font-family="helvetica"
    padding-bottom="20px"
  >
    ${text}
  </mj-text>
`

export const btLogo =
  `<mj-image
    width="130"
    padding-bottom="20px"
    src="http://bouncetribe.com/wp-content/uploads/2016/03/Logo-500.png"
  />`

export const btMainButton = (imgMainHref, imgMainSrc) =>`
  <mj-image width="168" href="${imgMainHref}" src="${imgMainSrc}" />
`
export const dividerUnSubscribe = `
  <mj-divider border-width="1px" border-style="dashed" border-color="lightgrey"/>
    <mj-inline-links base-url="https://test.bouncetribe.com">
      <mj-link font-size="9px"
        color="#999999"
        font-family="helvetica"
        align="center"
        padding-bottom="20px"
        href="/unsubscribe">
          I don't want to receive these emails
      </mj-link>
    </mj-inline-links>
  `
