import { create } from "zustand";

// Tutorial
// Declare a store, essentially the group/object you wish to save
type UserStore = {
    user: any | undefined
    setUser: (user: any) => void;
    setNull: () => void;
}

// Initialize default values or logic of functions
export const useUserStore = create<UserStore>((set) => ({
    user: null,
    setUser: (user: undefined) => {
        set(() => ({ user: user}))
    },
    setNull: () => {
        set((state) => ({ user: null}))
    }
}))

// Breadcrumbs
type BreadcrumbStore = {
    crumbs: string[];
    setBreadcrumbs: (crumbs: string[]) => void;
}

export const useBreadcrumbStore = create<BreadcrumbStore>((set) => ({
    crumbs: ['Home'],
    setBreadcrumbs: (newCrumbs: string[]) => {
        set(() => ({ crumbs: newCrumbs}))
    }
}))
