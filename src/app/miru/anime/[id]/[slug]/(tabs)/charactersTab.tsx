import CharacterCard from "@/components/shared/characters/character-card"
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
                characters.map((entry: any, idx: number) => {
                    
                    let lSideSrc = (entry.character.coverImageUrl) ? entry.character.coverImageUrl : `/storage/characters/${entry.character.id}.jpg`
                    let rSideSrc = null

                    if (entry.voiceActor) {
                        if (entry.voiceActor.coverImageUrl) {
                            rSideSrc = entry.voiceActor.coverImageUrl
                        } else {
                            rSideSrc = `/storage/voice-actors/${entry.voiceActor.id}.jpg`
                        }
                    }
                    return (
                        <CharacterCard 
                            key={idx} 
                            lSideTitle={entry.character.fullName}
                            lSideNote={entry.role}
                            lSideSrc={lSideSrc}
                            lSideLink={null}
                            rSideTitle={entry.voiceActor ? entry.voiceActor.fullName : 'N/A'}
                            rSideNote="Japanese"
                            rSideSrc={rSideSrc}
                            rSideLink={entry.voiceActor ? `/voice-actor/${entry.voiceActor.id}/${entry.voiceActor.slug}` : null}
                        />
                    )
                })
            }
        </div>
    )
}