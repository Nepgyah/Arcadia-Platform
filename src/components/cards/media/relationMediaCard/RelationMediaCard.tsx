import { Media } from "@/types/media";
import Link from "next/link";

import './style.scss';

interface Props {
    media: Media,
    relation: string,
    link: string
}
export default function RelationMediaCard(props: Props) {

    return (
        <Link href={props.link}>
            <div className="relation-media arc-card on-hover on-hover--grow">
                
                <div className="relation-media__clip">
                    <img className="relation-media__bg" src={props.media?.bannerImageUrl} alt="" />
                    <div className="relation-media__mask"></div>
                </div>
                <div className="relation-media__image">
                    <img src={props.media.coverImageUrl} alt={props.media.title} />
                </div>
                <div className="relation-media__text">
                    <p>{props.media.title}</p>
                    <p>{props.relation}</p>
                </div>
            </div>
        </Link>
    )
}