export interface User {
    id: number,
    username: string,
    picturePreset: number,
    listData: {
        anime: number,
        manga: number,
        games: number
    }
}