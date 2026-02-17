export default function CharacterCard({character}:{character : any}) {

    return (
        <div className="character-card border-radius-sm card">
            <img className="character-picture" src={`/storage/characters/${character.character.id}.jpg`} alt="" />
            <div className="names p-a-sm">
                <div className="character">
                    <p>{character.character.firstName} {character.character.lastName}</p>
                    <p>{character.role}</p>
                </div>
                <div className="voice-actor">
                    <p>Voice Actor</p>
                    <p>Role</p>
                </div>
            </div>
            <img className="voice-actor-picture" src="/" alt="" />
        </div>
    )
}