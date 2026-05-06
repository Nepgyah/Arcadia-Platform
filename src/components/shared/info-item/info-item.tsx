export default function InfoItem(
    {
        label, value, unit
    } : {
        label: string,
        value?: any,
        unit?: string
    }
) {
    return (
        <p className="info-item">
            <span className="info-item__label">{label}</span>: <span className="info-item__value clr-txt-fadded">{value !== null ? value : 'N/A'} {value ? unit : ''}</span>
        </p>
    )
}