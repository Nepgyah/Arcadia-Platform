export interface GraphqlResponse<T> {
    data: T,
    errors: Array<{message: string}>
}

export type ActionResult<T> = 
    | { 
        success: true, 
        data: T,
    } | 
    { 
        success: false, 
        error: string
    }

export type MessagedActionResult<T> = | { 
        success: true, 
        toasterMessage: string,
        data: T,
    } | 
    { 
        success: false, 
        error: string
    }


export interface RESTResponse<T> {
    detail?: string,
    message?: string,
    data: T
}

export interface PaginationInput {
    perPage: number,
    targetPage: number
}

// NEW API
export interface APIMetadata {
    message: string,
    detail?: string
}

export interface POSTSuccess<T> extends APIMetadata {
    success: true,
    data: T
}

export interface POSTError extends APIMetadata {
    success: false
}

export type POSTResponse<T> = 
    | POSTSuccess<T>
    | POSTError

export type GETResponse<T> = 
    | {
        success: true,
        data: T
    } | {
        success: false,
        message: string
    }