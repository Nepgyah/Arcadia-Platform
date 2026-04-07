interface GraphqlResponse<T> {
    data: T,
    message: string,
    errors: Array<{message: string}>
}

interface RESTResponse<T> {
    data: T,
    message: string
}