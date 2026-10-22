import { LucideIcon } from "lucide-react";

export interface URLItem {
    label: string,
    href: string,
    icon: LucideIcon
}

export type App = 'miru' | 'asobu' | 'yomu';