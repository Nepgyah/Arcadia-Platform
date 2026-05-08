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

export interface Pagination {
    perPage: number,
    currentPage: number
}