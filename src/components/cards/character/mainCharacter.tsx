import { Character, VoiceActor } from "@/types/base"

interface Props {
    character: Character,
    role: string,
    voiceActor: VoiceActor
}

import "@/styles/components/cards/character/_mc-card.scss";
import { Avatar } from "@chakra-ui/react";

export default function MainCharacterCard(props: Props) {

    return (
        <div className="mc-card has-mask arc-card">
            <img className="mc-card__image" src={props.character.coverImageUrl} alt={props.character.fullName} />
            <div className="mask"></div>
            <div className="mc-card__text">
                <div className="mc-card__character">
                    {
                        props.character.nicknames.length > 0 &&
                        <p className="mc-card__nickname">{props.character.nicknames[0]}</p>
                    }
                    <p className="mc-card__name">{props.character.fullName}</p>
                </div>
                <div className="mc-card__voice-actor">
                    <Avatar.Root>
                        <Avatar.Image src={props.voiceActor.coverImageUrl} />
                    </Avatar.Root>
                    <div className="voice-actor-text">
                        <p className="voice-actor-text__role">VA (JP)</p>
                        <p className="voice-actor-text__name">{props.voiceActor.fullName}</p>

                    </div>
                </div>
            </div>
        </div>
    )
}