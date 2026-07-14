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
export interface APIResponseMetadata {
    message: string,
    detail: string
}

export type APIResult<T> = | {
        success: true,
        result: T
    } | {
        success: false,
        error: string,
    }
export type MutationResponse<T> = 
    | { 
        success: true, 
        message: string,
        detail?: string,
        data?: T,
    } | 
    { 
        success: false, 
        message: string,
        detail?: string,
    }