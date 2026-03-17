import { Metadata } from "next/types"

import '@/styles/themes/_asobu-theme.scss';

export const metadata: Metadata = {
    title: 'Arcadia - Asobu',
}

export default function Layout(
    {
        children
    } : {
        children : React.ReactNode
    }
) {
    return (
        <div id="asobu-theme">
            {children}
        </div>
    )
}