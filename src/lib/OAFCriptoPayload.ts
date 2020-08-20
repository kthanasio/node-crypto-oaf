import { KEYUTIL , hextob64, KJUR, RSAKey } from "jsrsasign"
import { PAYLOADTYPE } from "../useCases/shared/PayloadType";
const Buffer = require('safer-buffer').Buffer
type req = {
    publicKey: string
    username: string
    password: string
    type?: number
}
export function OAFCriptoPayload(data: req): string {
    const { publicKey, username, password, type = PAYLOADTYPE.GETTOKEN } = data;
    const login = type == PAYLOADTYPE.GETTOKEN ? {"USERNAME": username , "PASSWORD": password} : {"USERNAME": username , "NEW_PASSWORD": password}

​    const rsaPub: string = new Buffer.from(publicKey,'base64').toString('utf-8')
    const keyObj = KEYUTIL.getKey(rsaPub)
    if (keyObj instanceof RSAKey) {
        return hextob64(KJUR.crypto.Cipher.encrypt(JSON.stringify(login), keyObj, 'RSA'))
    }
    throw new Error('Generic Error OAFCriptoPayload')
}

​
