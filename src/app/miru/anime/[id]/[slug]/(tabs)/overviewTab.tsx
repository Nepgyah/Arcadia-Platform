import { Suspense, use } from "react";

import { Skeleton, Tag } from "@chakra-ui/react";

import { Franchise } from "@/types/base";
import { Anime } from "@/types/miru";

import Header from "@/components/ui/headers/header";
import CharacterCard from "@/components/shared/characters/character-card";
import RelationMedia from "@/components/shared/relation-media";
import CharacterCardSkeleton from "@/components/shared/characters/characterCardSkeleton";
import VideoCard from "@/components/shared/videoCard";

export default function OverviewTab(
    {
        anime, charactersPromise, episodesPromise
    } : {
        anime: Anime,
        charactersPromise: Promise<any[]>,
        episodesPromise: Promise<any[]>
    }
) {
    return (
        <div id="overview-tab" className="flex flex-column row-gap-md">
            <div id="genres-franchise" className="two-column">
                <div id="summary">
                    <Header text="Summary" />
                    <div id="summary-text" dangerouslySetInnerHTML={{ __html: anime.summary }}></div>
                </div>
                <Suspense fallback={<Skeleton height="200px" width={'100%'}/>}>
                    <LatestEpisode episodesPromise={episodesPromise} animeID={anime.id} animeSlug={anime.slug} />
                </Suspense>
            </div>
            <div id="overview-characters">
                <Header text="Characters" />
                <Suspense fallback={<CharacterCardSkeleton />}>
                    <Characters charactersPromise={charactersPromise} />
                </Suspense>
            </div>
            <div id="relationships" >
                <Header text="Anime Flow" />
                <Suspense fallback={<Skeleton height="200px" width={'100%'}/>}>
                    <Relationships anime={anime} />
                </Suspense>
            </div>
        </div>
    )
}


function Characters({charactersPromise}:{charactersPromise : Promise<any>}) {
    const characters = use(charactersPromise)

    return (
        <div className="character-container">
            {
                characters.map((entry: any, idx: number) => {
                    if(idx < 6) {
                        let lSideSrc = (entry.character.coverImgUrl) ? entry.character.coverImgUrl : `/storage/characters/${entry.character.id}.jpg`
                        let rSideSrc = null
    
                        if (entry.character.voiceActor) {
                            if (entry.character.voiceActor.coverImgUrl) {
                                rSideSrc = entry.character.voiceActor.coverImgUrl
                            } else {
                                rSideSrc = `/storage/voice-actors/${entry.character.voiceActor.id}.jpg`
                            }
                        }
                        
                        return (
                            <CharacterCard 
                                key={idx} 
                                lSideTitle={entry.character.fullName}
                                lSideNote={entry.role}
                                lSideSrc={lSideSrc}
                                lSideLink={null}
                                rSideTitle={entry.character.voiceActor ? `${entry.character.voiceActor.firstName} ${entry.character.voiceActor.lastName}` : 'N/A'}
                                rSideNote="Japanese"
                                rSideSrc={rSideSrc}
                                rSideLink={entry.character.voiceActor ? `/voice-actor/${entry.character.voiceActor.id}/${entry.character.voiceActor.slug}` : null}
                            />
                        )
                    }
                })
            }
        </div>
    )
}

function Relationships({anime}:{anime : Anime}) {

    return (
        <div>
            <div className="two-column">
                <div id="prequel">
                    {
                        anime.prequel ?
                            <RelationMedia 
                                media={anime.prequel} 
                                app="miru" 
                                relation="Prequel"
                                link={`/miru/anime/${anime.prequel.id}/${anime.prequel.slug}`}
                                src={anime.prequel.coverImgUrl ? anime.prequel.coverImgUrl : `/storage/miru/${anime.prequel.id}/cover.jpg`}
                            />
                        :
                            <p>No Prequel Found</p>
                    }
                </div>
                <div id="sequel">
                    {
                        anime.sequels.length > 0 ?
                            <div className="flex flex-column row-gap-md">
                                {
                                    anime.sequels.map((anime: Anime, idx: number) => (
                                        <RelationMedia 
                                            key={idx}
                                            media={anime} 
                                            app="miru" 
                                            relation="Sequel"
                                            link={`/miru/anime/${anime.id}/${anime.slug}`}
                                            src={anime.coverImgUrl ? anime.coverImgUrl : `/storage/miru/${anime.id}/cover.jpg`}
                                        />
                                    ))
                                }
                            </div>
                        :
                            <p>No Sequel Found</p>
                    }
                    
                </div>
            </div>
        </div>
    )
}

function LatestEpisode({
    episodesPromise,
    animeID,
    animeSlug
} : {
    episodesPromise : Promise<any[]>,
    animeID : number,
    animeSlug : string
}) {
    const episodes = use(episodesPromise)
    let latestEpisode = (episodes.length) ? episodes[episodes.length - 1] : null;

    return (
        <div id="latest">
            <Header text="Latest Episode" />
            {
                latestEpisode ?
                    <VideoCard 
                        src={latestEpisode.coverImgUrl ? latestEpisode.coverImgUrl : `/storage/miru/${animeID}/episodes/${latestEpisode.number}.jpg`} 
                        href={`/miru/anime/${animeID}/${animeSlug}/watch/${latestEpisode.number}`}
                        title={`Ep: ${latestEpisode.number} - ${latestEpisode.title}`} 
                        subText=''                            
                    />
                :
                    <p>Episodes not found</p>
            }
        </div>  
    )
}