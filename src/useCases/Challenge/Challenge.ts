import { RESOURCE } from '../../shared/Resource';
import axios from 'axios'

interface req_options {
    applicationId: string
    xApiKey: string
    encriptedPayloadChallenge: string
    oafBaseUrl?: string
    session: string
}

const base_url = process.env.BASE_URL || ""

export class Challenge {

    constructor(private oaf_api_base_url: string = base_url)
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