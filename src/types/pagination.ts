export interface SortInput {
    category: string,
    direction: 'desc' | 'asc'
}

export interface PaginationResults {
    perPage: number,
    totalPages: number,
    totalItems: number
}