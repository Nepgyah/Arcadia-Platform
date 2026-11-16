import { Franchise } from "./base";

export interface Media {
    id: number,
    title: string,
    score: number,
    users: number,
    franchise: Franchise | null,
    summary: string,
    coverImageUrl: string,
    bannerImageUrl: string,
    bgImageUrl: string,
    updated_at: string,
    created_at: string,
    slug: string
}