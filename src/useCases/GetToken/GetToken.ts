import { Challenge } from '../Challenge/Challenge'
import axios, { AxiosResponse}  from 'axios'
import { RESOURCE } from '../shared/Resource';

interface req_options {
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

export class GetToken {

    constructor(private challenge: Challenge, private oaf_api_base_url: string = 'https://9hyxh9dsj1.execute-api.us-east-1.amazonaws.com/v1')
    {}
    
    public async getToken(params: req_options): Promise<response> {
        const { applicationId, xApiKey, encriptedPayload, encriptedPayloadChallenge} = params;
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
            return response;
            }, async error => {
                        if (error.response.status === 401) {
                            const { Session } = error.response.data
                            await this.challenge.postChallenge({applicationId: applicationId, 
                                                                xApiKey: xApiKey,
                                                                encriptedPayloadChallenge: encriptedPayloadChallenge,
                                                                session: Session})
                            return await axios.post(url, body,options)
                        }
                        else {
                            return Promise.reject(error)
                        }
                    })

            try {
                const api_response: AxiosResponse = await axios.post(url, body,options)
                const { ExpiresIn, TokenType, RefreshToken, IdToken} = api_response.data
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

    public static build(): GetToken {
        return new GetToken(new Challenge())
    }

}