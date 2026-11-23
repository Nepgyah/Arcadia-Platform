import { SocialMediaType } from "@/types/base"

export function SNSIcon({platform}:{platform: SocialMediaType}) {

    switch(platform) {
        case 'reddit': 
            return <img src='/assets/sns/reddit.png' alt="" />
        case 'twitter': 
            return <img src='/assets/sns/twitter.png' alt="" />
        case 'website': 
            return <img src='/assets/sns/website.png' alt="" />
        case 'youtube': 
            return <img src='/assets/sns/youtube.png' alt="" />
        case 'instagram': 
            return <img src='/assets/sns/instagram.png' alt="" />
        default:
            return <p>hi</p>
    }
}