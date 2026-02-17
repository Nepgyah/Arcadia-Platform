import '@/styles/pages/miru/_miru-layout.scss';

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