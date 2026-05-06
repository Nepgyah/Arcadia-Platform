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
    user: undefined,
    setUser: (user: undefined) => {
        set(() => ({ user: user}))
    },
    setNull: () => {
        set((state) => ({ user: null}))
    }
}))