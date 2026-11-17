import { MediaCharacter } from "@/types/base"
import { GetAnimeCharactersAction } from "./action"
import SectionHeader from "@/components/layout/sectionHeader"
import MainCharacterCard from "@/components/cards/character/mainCharacter"

export default async function Page(
    {
        params
    } : {
        params: Promise<{id: string, slug: string}>
    }
) {
    const { id, slug } = await params
    const characters = await GetAnimeCharactersAction(Number(id))
    console.log("CHARS: ", characters)
    return (
        <div id="page-anime-detail">
            <div id="main-characters">
                <SectionHeader title="Main Characters" />
                <div className="container">
                    {
                        characters.filter((node) => node.role == 'Main').map((node: MediaCharacter) => (
                            <MainCharacterCard 
                                key={node.character.fullName}
                                character={node.character}
                                role={String(node.role)}
                                voiceActor={node.voiceActor}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}