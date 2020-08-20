require('dotenv').config()
import { OAFCriptoPayload } from './lib/OAFCriptoPayload'
import { GetToken } from './useCases/GetToken/GetToken'
import { PAYLOADTYPE } from './useCases/shared/PayloadType'

const publicKey = process.env.PUBLICKEY || ""
const username  = process.env.USERNAME || ""
const password = process.env.PASSWORD || ""
const applicationId = process.env.APPLICATIONID || ""
const xApiKey = process.env.XAPIKEY || ""

const _OAFCriptoPayload = OAFCriptoPayload({publicKey, username, password, type: PAYLOADTYPE.GETTOKEN})
const _OAFCriptoPayloadChallenge = OAFCriptoPayload({publicKey, username, password, type: PAYLOADTYPE.CHALLENGE })


GetToken.build().getToken({ 
    applicationId: applicationId, 
    xApiKey: xApiKey,
    encriptedPayload: _OAFCriptoPayload,
    encriptedPayloadChallenge: _OAFCriptoPayloadChallenge})
    .then ((data)=> {
        console.log(data)
        return data
    })
    .catch((error) => {
        console.log(error.message)
    })