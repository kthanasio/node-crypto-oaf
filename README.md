# Amazon Open API Framework Authentication

## INSTALL
npm i node-crypto-oaf

## USAGE

## Generate OAF Payload
```
import { OAFCryptoPayload }  from 'node-crypto-oaf'

const publicKey = 'LSA....'
const username  = 'your_consumer_oaf_username'
const password = 'your_consumer_oaf_password'

const _OAFCryptoPayload = OAFCryptoPayload({publicKey, username, password, type: 1})
console.log(_OAFCryptoPayload)

const _OAFCryptoPayloadChallenge = OAFCryptoPayload({publicKey, username, password, type: 2})
console.log(_OAFCryptoPayloadChallenge)
```

## GET TOKEN

```
import { GetToken, OAFCryptoPayload }  from 'node-crypto-oaf'

const publicKey = 'LSA....'
const username  = 'your_consumer_oaf_username'
const password = 'your_consumer_oaf_password'
const applicationId = 'your_consumer_oaf_application_id'
const xApiKey = 'your_consumer_oaf_api_key'

const _OAFCryptoPayload = OAFCryptoPayload({publicKey, username, password, type: 1})
const _OAFCryptoPayloadChallenge = OAFCryptoPayload({publicKey, username, password, type: 2})

GetToken
.build()
.getToken({ 
    applicationId: applicationId, 
    xApiKey: xApiKey,
    encriptedPayload: _OAFCryptoPayload,
    encriptedPayloadChallenge: _OAFCryptoPayloadChallenge})
.then (async (data)=> {
        console.log(data)
        return data
    })
.catch((error) => {
        console.log(error.message)
    })
```

## REFRESH TOKEN

```
import { GetToken, OAFCryptoPayload , RefreshToken}  from 'node-crypto-oaf'

const publicKey = 'LSA....'
const username  = 'your_consumer_oaf_username'
const password = 'your_consumer_oaf_password'
const applicationId = 'your_consumer_oaf_application_id'
const xApiKey = 'your_consumer_oaf_api_key'

const _OAFCryptoPayload = OAFCryptoPayload({publicKey, username, password, type: 1})
const _OAFCryptoPayloadChallenge = OAFCryptoPayload({publicKey, username, password, type: 2 })

GetToken
.build()
.getToken({ 
    applicationId: applicationId, 
    xApiKey: xApiKey,
    encriptedPayload: _OAFCryptoPayload,
    encriptedPayloadChallenge: _OAFCryptoPayloadChallenge})
.then (async (data)=> {
        console.log(data)
        return data
    })
.then (async (data) => {
        const refreshToken = new RefreshToken()
        let refreshTokenData = data.RefreshToken;
        const refresh = await refreshToken.refreshToken({
            applicationId: applicationId, 
            xApiKey: xApiKey,
            refreshToken: refreshTokenData
        });
        console.log(refresh);
    })
.catch((error) => {
        console.log(error.message)
    })
```



