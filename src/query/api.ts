import { CapacitorHttp, HttpResponse } from '@capacitor/core'

// Example of a GET request
const doGet: (request: string, params?: any) => Promise<HttpResponse> = async (request: string, params: any) => {
    const options: {
        url: string;
        params: any;
    } = {
        url: request,
        // headers: { 'X-Fake-Header': 'Fake-Value' },
        params: params,
    }

    const response: HttpResponse = await CapacitorHttp.request({ ...options, method: 'GET' })

    return response
}

// Example of a POST request. Note: data
// can be passed as a raw JS Object (must be JSON serializable)
const doPost: (request: string, payload: any) => Promise<HttpResponse> = async (request: string, payload: any) => {
    const options: {
        url: string;
        data: any;
    } = {
        url: request,
        // headers: { 'X-Fake-Header': 'Fake-Value' },
        data: payload,
    }

    const response: HttpResponse = await CapacitorHttp.request({ ...options, method: 'POST' })

    return response
}

export { doGet, doPost }
