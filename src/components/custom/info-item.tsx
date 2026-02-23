export default function InfoItem(
    {
        label, value, unit
    } : {
        label: string,
        value?: string,
        unit?: string
    }
) {
    return (
        <p className="info-item">
            <span className="info-item__label">{label}</span>: <span className="info-item__value">{value !== null ? value: 'N/A'} {value ? unit : ''}</span>
        </p>
    )
}