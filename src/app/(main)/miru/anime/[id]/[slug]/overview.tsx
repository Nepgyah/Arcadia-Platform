import CharacterCard from "@/components/custom/character-card";
import Header from "@/components/custom/header";
import SetBreadcrumbs from "@/components/navigation/setBreadcrumbs";
import { Franchise } from "@/types/base";
import { Anime } from "@/types/miru";
import { Tag } from "@chakra-ui/react";
import { use } from "react";

export default function Overview(
    {
        animePromise, charactersPromise, franchisePromise
    } : {
        animePromise: Promise<Anime>,
        charactersPromise: Promise<any[]>,
        franchisePromise: Promise<Franchise>
    }
) {
    return (
        <div id="overview-tab" className="flex flex-column row-gap-md">
            <div id="genres-franchise">
                <Genres animePromise={animePromise} />
                <AnimeFranchise franchisePromise={franchisePromise} />
            </div>
            <div id="overview-characters">
                <Header text="Characters" />
                <Characters charactersPromise={charactersPromise} />
            </div>
        </div>
    )
}

// Overview sections
function Genres({animePromise}:{animePromise:Promise<any>}) {
    const anime = use(animePromise);

    return (
        <div id="overview-genres">
            <Header text="Genres"/>
            <div className="flex flex-wrap flex-gap-sm">
                {
                    anime.genres.map((genre: any, idx: number) => (
                        <Tag.Root key={idx} size={'xl'} className="card bg-miru-base clr-txt-dark">
                            <Tag.Label>{genre.name}</Tag.Label>
                        </Tag.Root>
                    ))
                }
            </div>
        </div>
    )
}

function AnimeFranchise({franchisePromise}:{franchisePromise : Promise<Franchise>}) {
    const franchise = use(franchisePromise)

    return (
        <div id="overview-franchise">
            <Header text="Franchise"/>
            {
                franchise ?
                    <div className="card">
                        <img src={`/storage/franchise/${franchise.id}.jpg`} />
                        <div className="mask"></div>
                        <p>{franchise.name}</p>
                    </div>
                :
                    <p>No Franchise found</p>
            }
        </div>
    )
}

function Characters({charactersPromise}:{charactersPromise : Promise<any>}) {
    const characters = use(charactersPromise)

    return (
        <div className="container">
            {
                characters.map((character: any, idx: number) => {
                    if(idx <= 6) {
                        return <CharacterCard character={character} key={idx} />
                    }
                })
            }
        </div>
    )
}