import Link from "next/link";

export default function CharacterCard(
    {
        lSideTitle, lSideNote, lSideLink, lSideSrc,
        rSideTitle, rSideNote, rSideLink, rSideSrc,
    } : {
        lSideTitle: string, lSideNote: string, lSideLink: string | null, lSideSrc: string,
        rSideTitle: string, rSideNote: string, rSideLink: string | null, rSideSrc: string
}) {
    return (
        <div className="character-card border-radius-sm card">
            <img className="character-picture" src={lSideSrc} alt="" />
            <div className="names p-a-sm">
                <div className="character">
                    <p>{lSideTitle}</p>
                    <p>{lSideNote}</p>
                </div>
                <div className="voice-actor">
                    {
                        rSideLink ?
                            <Link className="clickable" prefetch={false} href={rSideLink}>
                                <p className="hover-underline">{rSideTitle}</p>
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
                        <img className="voice-actor-picture" src={rSideSrc} alt=""/>
                    </Link>
                :
                    <img className="voice-actor-picture" src={rSideSrc} alt=""/>
            }
        </div>
    )
}