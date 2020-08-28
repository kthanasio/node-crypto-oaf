/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
import { RESOURCE } from '../../shared'
import axios, { AxiosResponse } from 'axios'

interface reqOptions {
    applicationId: string
    xApiKey: string
    refreshToken: string
    oafBaseUrl?: string
}

interface response {
    ExpiresIn: number
    TokenType: string
    IdToken: string
}

const baseUrl = process.env.BASE_URL || ''

export class RefreshToken {
  constructor (private oafApiBaseUrl: string = baseUrl) {}
  public async refreshToken (params: reqOptions): Promise<response> {
    const { applicationId, xApiKey, refreshToken } = params
    const url = `${this.oafApiBaseUrl}/${applicationId}/${RESOURCE.REFRESHTOKEN}`
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': xApiKey
      }
    }
    const body = {
      REFRESH_TOKEN: refreshToken
    }

    try {
      const apiResponse: AxiosResponse = await axios.post(url, body, options)
      const { ExpiresIn, TokenType, RefreshToken, IdToken } = apiResponse.data
      return {
        ExpiresIn,
        TokenType,
        IdToken
      }
    } catch (error) {
      throw new Error(error)
    }
  }
}
