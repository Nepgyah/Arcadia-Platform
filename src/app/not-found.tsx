import '@/styles/pages/_not-found.scss';
import { Button } from '@chakra-ui/react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
}

export default function NotFound() {
    return (
        <div id="page-not-found">
            <h1 className='clr-arc-accent'>404</h1>
            <p className="bold">Page Not Found</p>
            <p className='clr-txt-fadded'>The page you requested got lost in the filler episodes.</p>
            <Link href='/'>
                <Button>Return Home</Button>
            </Link>
        </div>
    )
}