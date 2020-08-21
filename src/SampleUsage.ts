require('dotenv').config()
import { OAFCryptoPayload } from './lib'
import { GetToken, RefreshToken } from './useCases'
import { PAYLOADTYPE } from './shared/PayloadType'

const publicKey = process.env.PUBLICKEY || ""
const username  = process.env.USERNAME || ""
const password = process.env.PASSWORD || ""
const applicationId = process.env.APPLICATIONID || ""
const xApiKey = process.env.XAPIKEY || ""

const _OAFCriptoPayload = OAFCryptoPayload({publicKey, username, password, type: PAYLOADTYPE.GETTOKEN})
const _OAFCriptoPayloadChallenge = OAFCryptoPayload({publicKey, username, password, type: PAYLOADTYPE.CHALLENGE })

GetToken
.build()
.getToken({ 
    applicationId: applicationId, 
    xApiKey: xApiKey,
    encriptedPayload: _OAFCriptoPayload,
    encriptedPayloadChallenge: _OAFCriptoPayloadChallenge})
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