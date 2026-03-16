'use client';

import TabButton from "@/components/custom/tabButton";
import { Info, Tv, Users } from "lucide-react";
import React, { Children, useState } from "react";

export default function TabWrapper({children}:{children: React.ReactNode}) {

    const [tab, setTab] = useState<string>("0");

    return (
        <div>
            <div id="tab-container">
                <TabButton label="Overview" value="0" currentValue={tab} icon={Info} setTabFunc={setTab}/>
                <TabButton label="Characters" value="1" currentValue={tab} icon={Users} setTabFunc={setTab}/>
            </div>
            {Children.map(children, (child, idx) => (
                <div hidden={tab !== `${idx}`}>
                    {child}
                </div>
            ))}
        </div>
    )
}