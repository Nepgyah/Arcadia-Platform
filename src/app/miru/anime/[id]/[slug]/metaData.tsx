import { Suspense, use } from "react";

import { Anime } from "@/types/miru";
import AnimeListInput from "../../../../(main)/miru/anime/[id]/[slug]/animeListInput";
import Header from "@/components/custom/header";
import InfoItem from "@/components/custom/info-item/info-item";
import { Franchise } from "@/types/base";
import SocialsList from "@/components/media/socials/socials";
import SocialsSkeleton from "@/components/media/socials/skeleton";
import { SkeletonText } from "@chakra-ui/react";

export default function MetaData(
    { 
        animePromise,
        franchisePromise
    } : { 
        animePromise: Promise<Anime>,
        franchisePromise: Promise<Franchise>
    }
) {
    return (
        <div className="details">
            {/* <AnimeListInput animePromise={animePromise} /> */}
            <div>
                <Header text="Socials" />
                <Suspense fallback={<SocialsSkeleton />}>
                    <SocialMedia franchisePromise={franchisePromise}/>
                </Suspense>
            </div>
            <div>
                <Header text="Misc" />
                <Suspense fallback={<SkeletonText noOfLines={3} />}>
                    <Misc animePromise={animePromise} />
                </Suspense>
            </div>
            <div>
                <Header text="Production" />
                <Suspense fallback={<SkeletonText noOfLines={3} />}>
                <Production animePromise={animePromise} />
                </Suspense>
            </div>
        </div>
    )
}


function Misc({animePromise}:{animePromise : Promise<Anime>}) {
    const anime = use(animePromise);

    return (
        <div className="flex-column">
            <InfoItem label='Status' value={anime.status} />
            <InfoItem label='Season' value={anime.season} />
            <InfoItem label='Rating' value={anime.rating} />
        </div>
    )
}

function Production({animePromise}:{animePromise : Promise<Anime>}) {
    const anime = use(animePromise);

    return (
        <div className="flex-column">
            <InfoItem label='Studio' value={anime.studio} />
        </div>
    )
}

function Sources({animePromise}:{animePromise : Promise<Anime>}) {
    const anime = use(animePromise);

    return (
        <div>
            <Header text="Sources" />
            <div className="flex-column">
                <InfoItem label='Season' value={anime.season} />
                <InfoItem label='Rating' value={anime.rating} />
            </div>
        </div>
    )
}

function SocialMedia({franchisePromise}:{franchisePromise:Promise<Franchise>}) {
    const franchise = use(franchisePromise)

    if (franchise.socials) {
        return (
            <SocialsList socials={franchise.socials} />
        )
    } else {
        return null
    }
}