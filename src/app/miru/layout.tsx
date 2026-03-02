import '@/styles/pages/miru/_miru-layout.scss';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Arcadia - Miru',
}
export default function MiruLayout(
    {
        children
    } : {
        children: React.ReactNode
    }
) {
    return (
        <div id="miru-layout">
            {children}
        </div>
    )
}