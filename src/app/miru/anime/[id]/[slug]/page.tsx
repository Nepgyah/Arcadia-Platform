import { MediaCharacter } from "@/types/base"
import { GetAnimeAction, GetAnimeCharactersAction } from "./action"
import SectionHeader from "@/components/layout/sectionHeader"
import MainCharacterCard from "@/components/cards/character/mainCharacter"
import SectionCard from "@/components/cards/SectionCard/SectionCard"
import { Quote } from "lucide-react"
import { notFound } from "next/navigation"
import RelationMediaCard from "@/components/cards/media/relationMediaCard"
import { Anime } from "@/types/miru"

export default async function Page(
    {
        params
    } : {
        params: Promise<{id: string, slug: string}>
    }
) {
    const { id, slug } = await params
    const characters = await GetAnimeCharactersAction(Number(id))
    const result = await GetAnimeAction(Number(id))
    if (!result) {
        notFound()
    }
    const anime = result.miru.anime

    return (
        <div id="page-anime-detail" className="page-spacing">
            <div id="summary-latest">
                <div id="media-summary">
                    <SectionCard
                        title="Description"
                        description="exmaple"
                        icon={Quote}
                        height={200}
                    >
                        <p dangerouslySetInnerHTML={{ __html: anime.summary}}></p>
                    </SectionCard>
                </div>
            </div>
            <div id="relations">
                <SectionHeader title="Anime Flow" />
                <div id="anime-flow-container">
                    {
                        anime.prequel && 
                        <RelationMediaCard 
                            media={anime.prequel} 
                            relation="Prequel"
                            link={`/miru/anime/${anime.id}/${anime.slug}`}
                        />
                    }
                    {
                        anime.sequels.map((anime: Anime) => (
                            <RelationMediaCard 
                                key={anime.id} 
                                media={anime} 
                                relation="Sequel"
                                link={`/miru/anime/${anime.id}/${anime.slug}`}
                            />
                        ))
                    }
                </div>
            </div>
            <div id="main-characters">
                <SectionHeader title="Main Characters" />
                <div className="container">
                    {
                        characters.filter((node) => node.role == 'Main').map((node: MediaCharacter, idx: number) => (
                            <MainCharacterCard 
                                key={node.character.fullName}
                                character={node.character}
                                role={String(node.role)}
                                jaVoiceActor={node.jaVoiceActor}
                                enVoiceActor={node.enVoiceActor}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}