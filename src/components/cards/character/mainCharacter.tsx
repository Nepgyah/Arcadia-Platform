import { Character, VoiceActor } from "@/types/base"

interface Props {
    character: Character,
    role: string,
    voiceActor: VoiceActor
}

import "@/styles/components/cards/character/_mc-card.scss";
import { Avatar } from "@chakra-ui/react";
import { Cake, Heart } from "lucide-react";

export default function MainCharacterCard(props: Props) {

    // TODO: USE DESIGN 5, moving quote to right side
    return (
        <div className="mc-card arc-card">
            <div className="mc-card__avatar">
                <img src={props.character.coverImageUrl} alt="" />
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
                        <p>&quot;I&apos;m going to win this for the folks back home... But first, sustenance.&quot;</p>
                    </div>
                </div>
                <div className="mc-card__voice-actors">
                    <div className="mc-card-voice-actor">
                        <Avatar.Root size={'xs'}>
                            <Avatar.Image src={props.voiceActor.coverImageUrl} />
                        </Avatar.Root>
                        <div className="mc-card-voice-actor__text">
                            <p>JP</p>
                            <p>{props.voiceActor.fullName}</p>
                        </div>
                    </div>
                    <div className="mc-card-voice-actor">
                        <Avatar.Root size={'xs'}>
                            <Avatar.Image src={props.voiceActor.coverImageUrl} />
                        </Avatar.Root>
                        <div className="mc-card-voice-actor__text">
                            <p>JP</p>
                            <p>{props.voiceActor.fullName}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}