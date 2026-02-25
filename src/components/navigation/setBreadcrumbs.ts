import { useBreadcrumbStore } from "@/app/store/store";

export function SetBreadcrumbs(breadcrumbs: string[]) {
    const setBreadcrumbs = useBreadcrumbStore((state) => state.setBreadcrumbs)
    setBreadcrumbs(breadcrumbs)
}