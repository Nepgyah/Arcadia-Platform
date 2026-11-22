import { LucideIcon } from "lucide-react";

import './sectionCard.scss';

interface props {
    title: string,
    description?: string,
    icon: LucideIcon,
    children: React.ReactNode,
    backgroundImage?: string,
    height?: number
}

export default function SectionCard(props: props) {

    // TOOD: CREATE SCSS FOR CARD
    return (
        <div className="section-card arc-card">
            <div className={`section-card__header ${props.backgroundImage && 'section-card__header--has-background'}`}>

                <div className="section-card__icon">
                    <props.icon size={36} />
                </div>

                <div className="section-card__heading">
                    <p className="section-card__title">{props.title}</p>
                    {
                        props.description &&
                            <p className="section-card__description">{props.description}</p>
                    }
                </div>
            </div>

            <div
                className="section-card__body"
                style={props.height ? { height: props.height } : undefined}
            >
                <div className="section-card__body-scroll">
                    {props.children}
                </div>
            </div>
        </div>
    )
}