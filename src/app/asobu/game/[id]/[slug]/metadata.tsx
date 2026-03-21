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
                <Header text="Tags" />
                <div className="flex flex-column row-gap-sm">
                    {
                        game.tags.length ? 
                            game.tags.map((tag: any, idx: number) => (
                                <p key={idx}>{tag.name}</p>
                            ))
                        :
                            <p>No Tags Found</p>
                    }
                </div>
            </div>
            <div>
                <Header text="Genres" />
                <div className="flex flex-column row-gap-sm">
                    {
                        game.genres.length ? 
                            game.genres.map((genre: any, idx: number) => (
                                <p key={idx}>{genre.name}</p>
                            ))
                        :
                            <p>No Genres Found</p>
                    }
                </div>
            </div>
            <div>
                <Header text="Release Dates" />
                <Platforms game={game} />
            </div>
            <div>
                <Header text="Ratings" />
                <div className="flex flex-column row-gap-sm">
                    <InfoItem label="ESRB" value={game.esrbRating} />
                    <InfoItem label="PEGI" value={game.pegiRating} />
                </div>
            </div>
        </div>
    )
}

function SocialMedia({franchisePromise}:{franchisePromise:Promise<Franchise>}) {
    const franchise = use(franchisePromise)

    if (franchise) {
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