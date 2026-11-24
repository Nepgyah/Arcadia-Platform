
import './statText.scss';

interface Props {
    label: string,
    value: string | number
}

export default function StatText(props: Props) {
    
    return (
        <div className='stat-text'>
            {props.label}:&nbsp;<span>{props.value != undefined ? props.value : 'N/A'}</span>
        </div>
    )
}