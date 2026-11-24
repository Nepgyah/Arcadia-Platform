interface props {
    label: string,
    value: React.ReactNode,
    icon: React.ReactNode,
    opacity: number,
    notes?: string
}

import './statCard.scss';

export default function StatCard(props: props) {

    return (
        <div className="arc-card stat-card">
            <p className="stat-card__label">{props.label}</p>
            <div className='stat-card__content'>
                <p className="stat-card__value" style={{ whiteSpace: 'pre-line' }}>{props.value}</p>
                <p className='stat-card__notes'>{props.notes}</p>
            </div>
            <div className='stat-card__icon' style={{ opacity: props.opacity}}>{props.icon}</div>
        </div>
    )
}