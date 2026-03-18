import { Suspense, use } from "react";

import { Anime } from "@/types/miru";
import Header from "@/components/custom/header";
import InfoItem from "@/components/custom/info-item/info-item";
import { Franchise } from "@/types/base";
import SocialsList from "@/components/media/socials/socials";
import SocialsSkeleton from "@/components/media/socials/skeleton";
import { SkeletonText } from "@chakra-ui/react";

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
            {/* <AnimeListInput animePromise={animePromise} /> */}
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
                <Header text="Production" />
                {
                    anime.producer.map((producer: any) => (
                        <p>{producer.name}</p>
                    ))
                }
            </div>
            <div>
                <Header text="Studio" />
                {
                    anime.studio.map((studio: any) => (
                        <p>{studio.name}</p>
                    ))
                }
            </div>
        </div>
    )
}


function Misc({anime}:{anime : Anime}) {

    return (
        <div className="flex-column">
            <InfoItem label='Status' value={anime.status} />
            <InfoItem label='Season' value={anime.season} />
            <InfoItem label='Rating' value={anime.rating} />
            <InfoItem label='Episodes' value={anime.episodeCount ? String(anime.episodeCount) : null} />
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