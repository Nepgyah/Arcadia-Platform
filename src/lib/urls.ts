import { Gamepad2, Home, Logs, LucideIcon, Search, Star, Tv, Users } from "lucide-react"

export interface url {
    title: string,
    path: string,
    icon: LucideIcon
}

export const mainboard: url[] = [
    { title: 'Home', path: '/', icon: Home},
    { title: 'Miru', path: '/miru', icon: Tv},
    { title: 'Asobu', path: '/asobu', icon: Gamepad2}
]

export const miruNav: url[] = [
    { title: 'Miru Home', path: '/miru', icon: Tv},
    { title: 'Anime List', path: '/miru/list', icon: Logs},
    { title: 'Search Anime', path: '/miru/search-anime', icon: Search},
    { title: 'All Time', path: '/miru/all-time', icon: Star},
    { title: 'Most Popular', path: '/miru/popular', icon: Users},
]

export const asobuNav: url[] = [
    { title: 'Asobu Home', path: '/asobu', icon: Tv},
    { title: 'Game List', path: '/asobu/list', icon: Logs},
]