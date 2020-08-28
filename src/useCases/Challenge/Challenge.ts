import { RESOURCE } from '../../shared'
import axios from 'axios'

interface reqOptions {
    applicationId: string
    xApiKey: string
    encriptedPayloadChallenge: string
    oafBaseUrl?: string
    session: string
}

const baseUrl = process.env.BASE_URL || ''

export class Challenge {
  // eslint-disable-next-line no-useless-constructor
  constructor (private oafApiBaseUrl: string = baseUrl) {}

  public async postChallenge (params: reqOptions): Promise<void> {
    const { applicationId, xApiKey, encriptedPayloadChallenge, session } = params
    const url = `${this.oafApiBaseUrl}/${applicationId}/${RESOURCE.CHALLENGE}`
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
    await axios.post(url, body, options)
  }
}
