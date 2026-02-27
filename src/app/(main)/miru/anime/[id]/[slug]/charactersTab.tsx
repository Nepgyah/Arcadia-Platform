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
                characters.map((character: any, idx: number) => 
                    <CharacterCard character={character} key={idx} />
                )
            }
        </div>
    )
}