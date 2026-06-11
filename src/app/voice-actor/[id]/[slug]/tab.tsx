'use client';

import TabButton from "@/components/ui/tabButton";
import { Info, Tv, Gamepad2 } from "lucide-react";
import React, { Children, useState } from "react";

export default function TabWrapper({children}:{children: React.ReactNode}) {

    const [tab, setTab] = useState<string>("0");

    return (
        <div>
            <div id="tab-container">
                <TabButton label="Anime Roles" value="0" currentValue={tab} icon={Tv} setTabFunc={setTab}/>
                <TabButton label="Game Roles" value="1" currentValue={tab} icon={Gamepad2} setTabFunc={setTab}/>
            </div>
            {Children.map(children, (child, idx) => (
                <div hidden={tab !== `${idx}`}>
                    {child}
                </div>
            ))}
        </div>
    )
}