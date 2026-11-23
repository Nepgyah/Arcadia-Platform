import { Character, MediaCharacter, VoiceActor } from "@/types/base"


import "@/styles/components/cards/character/_mc-card.scss";
import { Avatar } from "@chakra-ui/react";
import { Cake, Heart } from "lucide-react";
import { Tooltip } from "@/components/ui/tooltip";

export default function MainCharacterCard(props: MediaCharacter) {

    return (
        <div className="mc-card arc-card">
            <div className="mc-card__avatar">
                <img src={props.character?.coverImageUrl} alt="" />
            </div>
            <div className="mc-card__text">
                <div className="mc-card__top-half">
                    <div className="mc-card__meta">
                        <div className="mc-card-names">
                            <p className="mc-card-names__full-name">{props.character.fullName}</p>
                            <p className="mc-card-names__nickname">{props.character.nicknames[0] ? props.character.nicknames[0] : "\u00A0"}</p>
                        </div>
                        <div className="mc-card-details">
                            <div className="mc-card-detail">
                                <Cake/>
                                <div className="mc-card-detail__text">
                                    <p>Birthday</p>
                                    <p>TBA</p>
                                </div>
                            </div>
                            <div className="mc-card-detail">
                                <Heart/>
                                <div className="mc-card-detail__text">
                                    <p>Favorites</p>
                                    <p>TBA</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mc-card__quote">
                        <p>{props.character.quote && `"${props.character.quote}"`}</p>
                    </div>
                </div>
                <div className="mc-card__voice-actors">
                    {
                        props.jaVoiceActor && <VoiceActorContent voiceActor={props.jaVoiceActor} lang="JP" />
                    }
                     {
                        props.enVoiceActor && <VoiceActorContent voiceActor={props.enVoiceActor} lang="EN" />
                    }
                </div>
            </div>
        </div>
    )
}

function VoiceActorContent({voiceActor, lang}:{voiceActor: VoiceActor, lang: string}) {
    return (
        <div className="mc-card-voice-actor">
            <Avatar.Root size={'xs'}>
                <Avatar.Image src={voiceActor.coverImageUrl} />
            </Avatar.Root>
            <div className="mc-card-voice-actor__text">
                <p>{lang}</p>
                <Tooltip showArrow content={voiceActor.fullName}>
                    <p>{voiceActor.fullName}</p>
                </Tooltip>
            </div>
        </div>
    )
}