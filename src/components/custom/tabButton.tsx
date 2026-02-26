'use client';

export default function TabButton(
    {
        label, value, currentValue, icon, setTabFunc
    } : {
        label: string,
        value: string,
        currentValue: string,
        icon: "comment" | "graph" | "info" | "people" | "target",
        setTabFunc: (value: string) => void; 
    }
) {
    return (
        <div className={`tab-button ${currentValue === value && 'tab-button--selected'}`}>
            <div className="tab-button__icon border-radius-sm clickable" onClick={() => setTabFunc(value)}>
                <img src={`/icons/${icon}.png`} alt="" />
            </div>
            <div className="tab-button__label clickable" onClick={() => setTabFunc(value)}>
                <p>{label}</p>
            </div>
        </div>
    )
}