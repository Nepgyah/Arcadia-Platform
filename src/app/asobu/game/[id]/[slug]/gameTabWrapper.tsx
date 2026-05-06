'use client';

import TabButton from "@/components/ui/tabButton";
import { Info, LayersPlus, Star, Tv, Users } from "lucide-react";
import React, { Children, useState } from "react";

export default function TabWrapper({children}:{children: React.ReactNode}) {

    const [tab, setTab] = useState<string>("0");

    return (
        <div>
            <div id="tab-container">
                <TabButton label="Overview" value="0" currentValue={tab} icon={Info} setTabFunc={setTab}/>
                <TabButton label="Characters" value="1" currentValue={tab} icon={Users} setTabFunc={setTab}/>
                <TabButton label="DLC" value="2" currentValue={tab} icon={LayersPlus} setTabFunc={setTab}/>
                <TabButton label="Reviews" value="3" currentValue={tab} icon={Star} setTabFunc={setTab}/>
            </div>
            {Children.map(children, (child, idx) => (
                <div hidden={tab !== `${idx}`}>
                    {child}
                </div>
            ))}
        </div>
    )
}