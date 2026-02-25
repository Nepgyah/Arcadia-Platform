export interface url {
    title: string,
    path: string
}

export const mainboard: url[] = [
    { title: 'Home', path: ''},
    { title: 'Miru', path: '/miru'}
]

export const miruNav: url[] = [
    { title: 'Miru Home', path: '/miru'},
    { title: 'Anilist', path: '/miru/list'},
    { title: 'Search', path: '/miru/search'},
    { title: 'Most Popular', path: '/miru/popular'},
    { title: 'All Time', path: '/miru/all-time'}
]