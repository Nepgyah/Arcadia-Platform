import { Media } from "@/types/media";
import React, { createContext, useContext, useState, useMemo, ReactNode } from "react";

const MediaContext = createContext<Media | null>(null)

export const useMedia = () => {
    const context = useContext(MediaContext)
    if (!context) {
        throw new Error('useMedia must be used within MediaProvider')
    }

    return context
}
export function MediaProvider({media, children}:{media:Media, children: React.ReactNode}) {
    return (
        <MediaContext.Provider value={media}>
            {children}
        </MediaContext.Provider>
    )
}