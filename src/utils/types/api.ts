export interface GraphqlResponse<T> {
    data: T,
    message: string,
    errors: Array<{message: string}>
}

export type ActionResult<T> = 
    | { success: true, data: T}
    | { success: false, error: string}

export interface RESTResponse {
    detail?: string,
    message?: string
}