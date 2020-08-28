/* eslint-disable no-unused-vars */
import { Challenge } from '../'
import { RESOURCE } from '../../shared'
import axios, { AxiosResponse } from 'axios'

interface reqOptions {
    applicationId: string
    xApiKey: string
    encriptedPayload: string
    encriptedPayloadChallenge: string
    oafBaseUrl?: string
}

interface response {
    ExpiresIn: number
    TokenType: string
    RefreshToken: string
    IdToken: string
}

const baseUrl = process.env.BASE_URL || ''

export class GetToken {
  // eslint-disable-next-line no-useless-constructor
  constructor (private challenge: Challenge, private oaf_api_base_url: string = baseUrl) {}

  public async getToken (params: reqOptions): Promise<response> {
    const { applicationId, xApiKey, encriptedPayload, encriptedPayloadChallenge } = params
    const url = `${this.oaf_api_base_url}/${applicationId}/${RESOURCE.GETTOKEN}`
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': xApiKey
      }
    }
    const body = {
      value: encriptedPayload
    }

    axios.interceptors.response.use(response => {
      return response
    }, async error => {
      if (error.response.status === 401) {
        const { Session } = error.response.data
        await this.challenge.postChallenge({
          applicationId: applicationId,
          xApiKey: xApiKey,
          encriptedPayloadChallenge: encriptedPayloadChallenge,
          session: Session
        })
        return await axios.post(url, body, options)
      } else {
        return Promise.reject(error)
      }
    })

    try {
      const apiResponse: AxiosResponse = await axios.post(url, body, options)
      const { ExpiresIn, TokenType, RefreshToken, IdToken } = apiResponse.data
      return {
        ExpiresIn,
        TokenType,
        RefreshToken,
        IdToken
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  public static build (url?: string): GetToken {
    return new GetToken(new Challenge(), url)
  }
}
