import CharacterCard from "@/components/media/characters/character-card"
import { use } from "react"

export default function CharactersTab(
    {
        charactersPromise
    } : {
        charactersPromise: Promise<any[]>
    }
) {
    const characters = use(charactersPromise)
    
    return (
        <div className="character-container">
            {
                characters.map((entry: any, idx: number) => 
                    <CharacterCard 
                        key={idx} 
                        lSideTitle={`${entry.character.firstName} ${entry.character.lastName}`}
                        lSideNote={entry.role}
                        lSideSrc={`/storage/characters/${entry.character.id}.jpg`}
                        lSideLink={null}
                        rSideTitle={entry.character.voiceActor ? `${entry.character.voiceActor.firstName} ${entry.character.voiceActor.lastName}` : 'N/A'}
                        rSideNote="Japanese"
                        rSideSrc={entry.character.voiceActor ? `/storage/voice-actors/${entry.character.voiceActor.id}.jpg` : '/'}
                        rSideLink={entry.character.voiceActor ? `/voice-actor/${entry.character.voiceActor.id}/${entry.character.voiceActor.slug}` : null}
                    />
                )
            }
        </div>
    )
}