import SearchArcadia from '@/features/core/arcadiaSearch'
import ChangeLanguage from '@/features/core/changeLanguage'
import '@/styles/layout/navigation/_top-navigation.scss'


export default function TopNavigation() {

    return (
        <div id="top-navigation">
            <div id='breadcrumbs'>
                breadcrumps to be implemented
            </div>
            <SearchArcadia />
            <ChangeLanguage />
        </div>
    )
}