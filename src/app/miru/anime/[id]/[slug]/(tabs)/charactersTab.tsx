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
                characters.map((entry: any, idx: number) => {
                    
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
                })
            }
        </div>
    )
}