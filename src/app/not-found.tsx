import '@/styles/pages/_not-found.scss';

export default function NotFound() {
    return (
        <div id="page-not-found">
            <h1 className='clr-arc-accent'>404</h1>
            <p className="bold">Page Not Found</p>
            <p className='clr-txt-fadded'>The page you requested got lost in the filer episodes.</p>
        </div>
    )
}