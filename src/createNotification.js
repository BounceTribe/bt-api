export default async function createNotification({type, forId, byId}) {
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
