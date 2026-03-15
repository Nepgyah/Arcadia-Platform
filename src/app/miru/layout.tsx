import '@/styles/themes/_miru-theme.scss';
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
        <div id="miru-theme">
            {children}
        </div>
    )
}