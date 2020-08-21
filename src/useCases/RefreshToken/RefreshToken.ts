// import { Challenge } from '../Challenge/Challenge'
import { RESOURCE } from '../../shared';
import axios, { AxiosResponse}  from 'axios'

interface req_options {
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

const base_url = process.env.BASE_URL || ""

export class RefreshToken {

    constructor(private oaf_api_base_url: string = base_url)
    {}
    
    public async refreshToken(params: req_options): Promise<response> {
        const { applicationId, xApiKey, refreshToken} = params;
        const url = `${this.oaf_api_base_url}/${applicationId}/${RESOURCE.REFRESHTOKEN}`
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': xApiKey                    
            }
        }
        const body = {
            REFRESH_TOKEN: refreshToken
        }

        // axios.interceptors.response.use(response => {
        //     return response;
        //     }, async error => {
        //                 if (error.response.status === 401) {
        //                     const { Session } = error.response.data
        //                     await this.challenge.postChallenge({applicationId: applicationId, 
        //                                                         xApiKey: xApiKey,
        //                                                         encriptedPayloadChallenge: encriptedPayloadChallenge,
        //                                                         session: Session})
        //                     return await axios.post(url, body,options)
        //                 }
        //                 else {
        //                     return Promise.reject(error)
        //                 }
        //             })

            try {
                const api_response: AxiosResponse = await axios.post(url, body,options)
                const { ExpiresIn, TokenType, RefreshToken, IdToken} = api_response.data
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