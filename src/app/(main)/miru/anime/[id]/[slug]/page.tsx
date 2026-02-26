import { use } from "react"

import { GetAnime, GetAnimeCharacters, GetAnimeFranchise } from "./animeDetailQueries"
import { Anime } from "@/types/miru";
import Overview from "./overview";
import Details from "./details";
import SetBreadcrumbs from "@/components/navigation/setBreadcrumbs";

import '@/styles/pages/miru/_anime-details.scss';
import TabWrapper from "./animeTabWrapper";

export default async function AnimeDetails(
    props: {
        params: Promise<{id: string, slug: string}>
    }
) {

    const { id } = await props.params
    const animePromise = GetAnime(id);
    const charactersPromise = GetAnimeCharacters(id);
    const franchisePromise = GetAnimeFranchise(id);

    return (
        <div id="page-anime-details" className="page-content">
            <Hero animePromise={animePromise}/>
            <div className="split-content">
                <Details animePromise={animePromise} />
                <TabWrapper>
                    <Overview animePromise={animePromise} charactersPromise={charactersPromise} franchisePromise={franchisePromise} />
                    <div>
                        charactesr
                    </div>
                </TabWrapper>
                <div>
                    {/* Tab Section Here */}
                </div>
            </div>
        </div>
    )
}

function Hero(
    {
        animePromise
    } : {
        animePromise : Promise<Anime>
    }
) {
    const anime = use(animePromise);
    return (
        <div id="hero">
            <SetBreadcrumbs breadcrumbs={['Miru', 'Anime', `${anime.title}`]} />
            <div className="border-radius-md card">
                <img id="hero-image" src={`/storage/miru/${anime.id}.jpg`} />
                <div id="hero-text">
                    <p id="title" className="clr-miru-base">{anime.title}</p>
                    <p id="summary">{anime.summary}</p>
                </div>
            </div>
            <div className="p-a-md card">
                <p>WIP</p>
            </div>
        </div>
    )
}