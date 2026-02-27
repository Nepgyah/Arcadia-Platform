import { Social, Socials } from "@/types/base"
import Header from "./header"
import React from "react"
import Link from "next/link"
export default function SocialsList(
    {
        socials
    } : {
        socials: Socials
    }
) {
    return (
        <React.Fragment>
            <Header text="Socials" />
            <div className="socials-list">
                { socials.website && <SocialRow social={socials.website} type="website" /> }
                { socials.youtube && <SocialRow social={socials.youtube} type="youtube" /> }
                { socials.twitter && <SocialRow social={socials.twitter} type="twitter" /> }
                { socials.reddit && <SocialRow social={socials.reddit} type="reddit" /> }
                { socials.instagram && <SocialRow social={socials.instagram} type="instagram" /> }
            </div>
        </React.Fragment>
    )
}

function SocialRow(
    {
        social, type
    } : {
        social: Social,
        type: string
    }
) {
    return (
        <Link href={social.link} target="_blank">
            <div className={`social social--${type} shadow border-radius-sm animation-hover`}>
                <div className="social__icon">
                    <img src={`/sns/${type}.png`} alt="" />
                </div>
                <div className="social__handle">
                    <p>{social.handle}</p>
                </div>
            </div>
        </Link>
    )
}