import { create } from "zustand";

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