'use client';

import Link from "next/link";
import { useState } from "react";

export default function CharacterCard(
    {
        lSideTitle, lSideNote, lSideLink, lSideSrc,
        rSideTitle, rSideNote, rSideLink, rSideSrc,
    } : {
        lSideTitle: string, lSideNote: string, lSideLink: string | null, lSideSrc: string,
        rSideTitle: string, rSideNote: string, rSideLink: string | null, rSideSrc: string
}) {

    const [sideSelected, setSideSelected] = useState<'left' | 'right' | null>(null)
    
    return (
        <div className="character-card border-radius-sm card">
            <div className="character-picture" onMouseEnter={() => setSideSelected('left')} onMouseLeave={() => setSideSelected(null)}>
                <div className={`mask ${sideSelected == 'right' && 'selected'}`}></div>
                <img src={lSideSrc} alt="" />
            </div>
            <div className="names p-a-sm">
                <div className="character">
                    <p>{lSideTitle}</p>
                    <p>{lSideNote}</p>
                </div>
                <div className="voice-actor">
                    {
                        rSideLink ?
                            <Link className="clickable" prefetch={false} href={rSideLink}>
                                <p className="hover-underline" onMouseEnter={() => setSideSelected('right')} onMouseLeave={() => setSideSelected(null)}>{rSideTitle}</p>
                            </Link>
                        :
                            <p className="hover-underline">{rSideTitle}</p>
                    }
                    <p>Japanese</p>
                </div>
            </div>

            {
                rSideLink ?
                    <Link className="clickable" prefetch={false} href={rSideLink}>
                        <div className="voice-actor-picture" onMouseEnter={() => setSideSelected('right')} onMouseLeave={() => setSideSelected(null)}>
                            <div className={`mask ${sideSelected == 'left' && 'selected'}`}></div>
                            <img src={rSideSrc} alt=""/>
                        </div>
                    </Link>
                :
                    <img className="voice-actor-picture" src={rSideSrc} alt=""/>
            }
        </div>
    )
}