import VideoCard from "@/components/media/video/videoCard";
import { AnimeEpisode } from "@/types/miru";
import { use } from "react";

export default function EpisodesTab(
    {
        animeID,
        animeSlug,
        episodesPromise
    } : {
        animeID: string,
        animeSlug: string,
        episodesPromise: Promise<AnimeEpisode[]>
    }
) {
    const episodes = use(episodesPromise)

    return (
        <div id="episodes-tab">
            {
                episodes ?
                    episodes.map((episode: AnimeEpisode, idx: number) => (
                        <VideoCard 
                            key={idx}
                            src={`/storage/miru/${animeID}/episodes/${episode.number}.jpg`} 
                            href={`/miru/anime/${animeID}/${animeSlug}/watch/${episode.number}`}
                            title={`Ep: ${episode.number} - ${episode.title}`} 
                            subText={episode.description}                            
                        />
                    ))
                :
                    <p>No episodes found on Arcadia</p>
            }
        </div>
    )
}