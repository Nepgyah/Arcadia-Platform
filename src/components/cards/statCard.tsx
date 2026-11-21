interface props {
    label: string,
    value: any,
    icon: React.ReactNode,
    opacity: number,
    notes?: string
}

import '@/styles/components/cards/_stat-card.scss';

export default function StatCard(props: props) {

    return (
        <div className="arc-card stat-card">
            <p className="stat-card__label">{props.label}</p>
            <p className="stat-card__value" style={{ whiteSpace: 'pre-line' }}>{props.value}</p>
            <div className='stat-card__icon' style={{ opacity: props.opacity}}>{props.icon}</div>
            <p className='stat-card__notes'>{props.notes}</p>
        </div>
    )
}