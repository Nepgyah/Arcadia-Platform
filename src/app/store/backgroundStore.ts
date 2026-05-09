import { useEffect } from 'react';
import { create } from 'zustand';

type BackgroundStore = {
    bgUrl: string,
    setBgUrl: (url: string) => void,
    hasCustomBg: boolean,
    setHasCustomBg: (value: boolean) => void
}

export const useBackgroundStore = create<BackgroundStore>((set) => ({
    bgUrl: "/wallpaper/default-wallpaper.jpg",
    setBgUrl: (newUrl: string) => {
        set(() => ({bgUrl: newUrl}))
    },
    hasCustomBg: false,
    setHasCustomBg: (value: boolean) => {
        set(() => ({hasCustomBg: value}))
    }
}))