import { User } from "./user"

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

export interface MediaReview {
    id: number,
    review: string,
    media: Media,
    user: User,
    score: number
}

export interface Social {
    handle: string,
    url: string
}

export interface Socials {
    instagram : Social,
    reddit: Social,
    youtube: Social,
    twitter: Social,
    website: Social
}