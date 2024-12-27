import { Response } from 'express'

export const sendResponse = (
    response: Response,
    code: number,
    message: string,
    dataResponse?:any
): Response => {
    let data : object

    if (dataResponse) {
        if (
            typeof dataResponse === 'object' &&
            dataResponse !== null &&
            !Array.isArray(dataResponse)
        ) {
            data = [dataResponse]
        } else {
            data = [...dataResponse]
        }
    } else {
        data = []
    }

    const jsonResponse = {
        statusCode: code,
        message,
        data
    }
    return response.status(200).json(jsonResponse)
}
