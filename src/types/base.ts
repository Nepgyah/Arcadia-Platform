export interface Franchise {
    id: number,
    name: string,
    slug: string,
    socials: Socials
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

export interface Social {
    url: string,
    link: string
}

export interface Socials {
    instagram : Social,
    reddit: Social,
    youtube: Social,
    twitter: Social,
    website: Social
}