import { useEffect } from 'react';
import { create } from 'zustand';

type BackgroundStore = {
    bgUrl: string | null,
    setBgUrl: (url: string) => void
}

export const useBackgroundStore = create<BackgroundStore>((set) => ({
    bgUrl: "/wallpaper/default-wallpaper.jpg",
    setBgUrl: (newUrl: string) => {
        set(() => ({bgUrl: newUrl}))
    }
}))