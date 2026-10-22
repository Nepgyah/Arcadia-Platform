import { URLItem } from "@/types/misc";
import { BookBookmark, GamepadIcon, Home, Tv } from "lucide-react";

export const MainURL: URLItem[] = [
    {
        label: 'Home',
        href: '/',
        icon: Home
    },
    {
        label: 'Miru',
        href: '/miru',
        icon: Tv
    },
    {
        label: 'Asobu',
        href: '/asobu',
        icon: GamepadIcon
    },
    {
        label: 'Yomu',
        href: '/yomu',
        icon: BookBookmark
    },
]