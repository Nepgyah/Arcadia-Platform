import { use } from "react";

import { Anime } from "@/types/miru";
import AnimeListInput from "./animeListInput";
import Header from "@/components/custom/header";
import InfoItem from "@/components/custom/info-item";

export default function Details(
    { animePromise } : { animePromise: Promise<Anime>}
) {
    return (
        <div className="details">
            <AnimeListInput animePromise={animePromise} />
            <Misc animePromise={animePromise} />
            <Production animePromise={animePromise} />
            {/* <Sources animePromise={animePromise} /> */}
        </div>
    )
}


function Misc({animePromise}:{animePromise : Promise<Anime>}) {
    const anime = use(animePromise);

    return (
        <div>
            <Header text="Misc" />
            <div className="flex-column">
                <InfoItem label='Status' value={anime.status} />
                <InfoItem label='Season' value={anime.season} />
                <InfoItem label='Rating' value={anime.rating} />
            </div>
        </div>
    )
}

function Production({animePromise}:{animePromise : Promise<Anime>}) {
    const anime = use(animePromise);

    return (
        <div>
            <Header text="Production" />
            <div className="flex-column">
                <InfoItem label='Studio' value={anime.studio} />
            </div>
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