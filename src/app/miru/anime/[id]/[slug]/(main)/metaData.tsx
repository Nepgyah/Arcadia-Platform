import { Suspense, use } from "react";

import { Anime } from "@/types/miru";
import Header from "@/components/custom/header";
import InfoItem from "@/components/custom/info-item/info-item";
import { Franchise } from "@/types/base";
import SocialsList from "@/components/media/socials/socials";
import SocialsSkeleton from "@/components/media/socials/skeleton";
import { SkeletonText } from "@chakra-ui/react";
import AnimeListInput from "../animeListInput";

export default function MetaData(
    { 
        anime,
        franchisePromise
    } : { 
        anime: Anime
        franchisePromise: Promise<Franchise>
    }
) {
    return (
        <div id="metadata-column">
            <AnimeListInput anime={anime} />
            <div>
                <Header text="Socials" />
                <Suspense fallback={<SocialsSkeleton />}>
                    <SocialMedia franchisePromise={franchisePromise}/>
                </Suspense>
            </div>
            <div>
                <Header text="Misc" />
                <Misc anime={anime} />
            </div>
            <div>
                <Header text="Genres" />
                <div className="flex flex-column row-gap-sm">
                {
                    anime.genres.map((genre: any, idx: number) => (
                        <p key={idx}>{genre.name}</p>
                    ))
                }
                </div>
            </div>
            <div>
                <Header text="Production" />
                <div className="flex flex-column row-gap-sm">
                {
                    anime.producer.map((producer: any, idx: number) => (
                        <p key={idx}>{producer.name}</p>
                    ))
                }
                </div>
            </div>
            <div>
                <Header text="Studio" />
                <div className="flex flex-column row-gap-sm">
                {
                    anime.studio.map((studio: any, idx: number) => (
                        <p key={idx}>{studio.name}</p>
                    ))
                }
                </div>
            </div>
        </div>
    )
}


function Misc({anime}:{anime : Anime}) {

    return (
        <div className="flex flex-column row-gap-sm">
            <InfoItem label="Type" value={anime.type} />
            <InfoItem label='Status' value={anime.status} />
            <InfoItem label='Season' value={anime.season} />
            <InfoItem label='Rating' value={anime.rating} />
            <InfoItem label='Episodes' value={anime.episodeCount ? String(anime.episodeCount) : null} />
            <InfoItem label="Start Date" value={anime.airingStartDate} />
            <InfoItem label="End Date" value={anime.airingEndDate} />
        </div>
    )
}

function SocialMedia({franchisePromise}:{franchisePromise:Promise<Franchise>}) {
    const franchise = use(franchisePromise)

    if (franchise?.socials) {
        return (
            <SocialsList socials={franchise.socials} />
        )
    } else {
        return <p className="clr-txt-fadded">No socials found</p>
    }
}