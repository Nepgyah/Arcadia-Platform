import Header from "@/components/custom/header";
import InfoItem from "@/components/custom/info-item/info-item";
import SocialsSkeleton from "@/components/media/socials/skeleton";
import SocialsList from "@/components/media/socials/socials";
import { AsobuGame } from "@/types/asobu";
import { Franchise } from "@/types/base";
import { Suspense, use } from "react";

export default function Metadata(
    {
        game, franchisePromise
    } : {
        game: AsobuGame,
        franchisePromise: Promise<any>
    }
) {
    return (
        <div id="metadata-column">
            <div>
                <Header text="Socials" />
                <Suspense fallback={<SocialsSkeleton />}>
                    <SocialMedia franchisePromise={franchisePromise} />
                </Suspense>
            </div>
            <div>
                <Header text="Release Dates" />
                <Platforms game={game} />
            </div>
            <div>
                <Header text="Ratings" />
                <div className="flex-row row-gap-md">
                    <InfoItem label="ESRB" value={game.esrbRating} />
                    <InfoItem label="PEGI" value={game.pegiRating} />
                </div>
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
        return <p className="clr-txt-fadded">No socials found</p>
    }
}

function Platforms({game}:{game : AsobuGame}) {

    if (game.platforms.length) {
        return (
            <div className="flex-row row-gap-md">
                {
                    game.platforms.map((node: any, idx: number) => (
                        <InfoItem 
                            key={idx}
                            label={node.platform.name} 
                            value={node.releaseDate} 
                        />
                    ))
                }
            </div>
        )
    } else {
        return (
            <div>
                No dates found
            </div>
        )
    }
}