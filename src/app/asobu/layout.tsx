import { Metadata } from "next/types"

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