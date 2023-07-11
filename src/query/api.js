import { CapacitorHttp } from '@capacitor/core'

// Example of a GET request
const doGet = async (request, params) => {
    const options = {
        url: request,
        // headers: { 'X-Fake-Header': 'Fake-Value' },
        params: params,
    }

    const response = await CapacitorHttp.request({ ...options, method: 'GET' })

    return response
}

// Example of a POST request. Note: data
// can be passed as a raw JS Object (must be JSON serializable)
const doPost = async (request, payload) => {
    const options = {
        url: request,
        // headers: { 'X-Fake-Header': 'Fake-Value' },
        data: payload,
    }

    const response = await CapacitorHttp.request({ ...options, method: 'POST' })

    return response
}

export { doGet, doPost }
