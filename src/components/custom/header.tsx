export default function Header({text}:{text:string}) {
    return (
        <div className="header">
            <div className="header__box"></div>
            <h2>{text}</h2>
        </div>
    )
}