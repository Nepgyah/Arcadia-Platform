export interface Franchise {
    id: number,
    name: string,
    slug: string,
    socials: any
}

export interface Media {
    id: number,
    title: string,
    score: number,
    users: number,
    slug: string,
    summary: string,
    created_at: string,
    updated_at: string,
    franchise: Franchise
}