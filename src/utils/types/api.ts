interface GraphqlResponse<T> {
    data: T,
    message: string,
    errors: Array<{message: string}>
}

export interface RESTResponse {
    detail?: string,
    message?: string
}