export interface Social {
    url: string,
    handle: string
}

export type SocialMediaType = 'reddit' | 'twitter' | 'website' | 'youtube' | 'instagram'

export interface Franchise {
    id: number,
    name: string,
    slug: string,
    coverImage: string,
    socials: Social[]
}