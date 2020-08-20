import { RESOURCE } from '../shared/Resource';
import axios from 'axios'

interface req_options {
    applicationId: string
    xApiKey: string
    encriptedPayloadChallenge: string
    oafBaseUrl?: string
    session: string
}

export class Challenge {

    constructor(private oaf_api_base_url: string = 'https://9hyxh9dsj1.execute-api.us-east-1.amazonaws.com/v1')
    {}

    public async postChallenge(params: req_options): Promise<void> {
        const { applicationId, xApiKey, encriptedPayloadChallenge, session} = params;
        const url = `${this.oaf_api_base_url}/${applicationId}/${RESOURCE.CHALLENGE}`
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': xApiKey                    
            }
        }
        const body = {
            ChallengeName: 'NEW_PASSWORD_REQUIRED',
            Session: session,
            ChallengeResponses: encriptedPayloadChallenge
        }
        await axios.post(url, body,options)
    }
}