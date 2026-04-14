export interface url {
    title: string,
    path: string
}

export const mainboard: url[] = [
    { title: 'Home', path: '/'},
    { title: 'Miru', path: '/miru'},
    { title: 'Asobu', path: '/asobu'}
]

export const miruNav: url[] = [
    { title: 'Miru Home', path: '/miru'},
    { title: 'Anime List', path: '/miru/list'},
    // { title: 'Search', path: '/miru/search'},
    { title: 'All Time', path: '/miru/all-time'},
    { title: 'Most Popular', path: '/miru/popular'},
]

export const asobuNav: url[] = [
    { title: 'Asobu Home', path: '/asobu'},
]