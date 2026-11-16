/* eslint-disable @next/next/no-img-element */
import { GetFranchiseResponse } from "@/actions/franchise/getFranchiseAction";
import { Social, SocialMediaType } from "@/types/base";
import { use } from "react";

import '@/styles/components/data/_franchise-socials.scss'
import Link from "next/link";
import { Tooltip } from "../ui/tooltip";

export function FranchiseSocials(
    {
        franchisePromise
    } : {
        franchisePromise : Promise<GetFranchiseResponse> | null
    }
) {

    if(franchisePromise) {
        const franchise = use(franchisePromise).base.franchise

        return <SocialList socials={franchise.socials} />

    } else {
        return <NoSocials />
    }
}

function SocialList({socials}:{socials: Social[]}) {
    return (
        <div className="socials-list">
            {
                Object.entries(socials).map(([platform, social]) => (
                <Tooltip showArrow key={platform} content={social.handle}>
                    <a href={social.url} target="_blank">
                        <div className={`sns-entry sns-entry--${platform} box-shadow on-hover on-hover--cursor on-hover--grow`}>
                            <div className="sns-entry__icon">
                                <GetSocialIcon platform={platform as SocialMediaType}  />
                            </div>
                            <div className="sns-entry__handle">
                                <span>{social.handle}</span>
                            </div>
                        </div>
                    </a>
                </Tooltip>
            ))}

        </div>
    )
}

function GetSocialIcon({platform}:{platform: SocialMediaType}) {

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

function NoSocials() {
    return (
        <p>No Social</p>
    )
}