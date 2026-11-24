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

export interface Character {
    id: number,
    coverImageUrl: string,
    firstName: string,
    lastName: string,
    fullName: string
    nicknames: string[],
    slug: string,
    quote: string
}

export interface MediaCharacter {
    character: Character,
    role: unknown,
    jaVoiceActor: VoiceActor,
    enVoiceActor: VoiceActor
}

export interface Company {
    id: number,
    slug: string,
    name: string
}

export interface VoiceActor {
    id: string,
    slug: string,
    coverImageUrl: string,
    firstName: string,
    lastName: string,
    fullName: string
}