'use client';

import { LucideIcon } from "lucide-react";

export default function TabButton(
    {
        label, value, currentValue, icon: Icon, setTabFunc
    } : {
        label: string,
        value: string,
        currentValue: string,
        icon: LucideIcon
        setTabFunc: (value: string) => void; 
    }
) {
    return (
        <div className={`tab-button ${currentValue === value && 'tab-button--selected'}`}>
            <div className="tab-button__icon border-radius-sm clickable" onClick={() => setTabFunc(value)}>
                <Icon />
            </div>
            <div className="tab-button__label clickable" onClick={() => setTabFunc(value)}>
                <p>{label}</p>
            </div>
        </div>
    )
}