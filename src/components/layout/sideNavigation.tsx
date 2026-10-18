import '@/styles/layout/navigation/_side-navigation.scss'
import { URLItem } from '@/types/misc'
import Link from 'next/link'
import LinkButton from '../ui/button/linkButton'
import { Avatar, Button } from '@chakra-ui/react'
import { UserCog } from 'lucide-react'

export default function SideNavigation({urlSet}:{urlSet: URLItem[]}) {

    return (
        <div id="side-navigation">
           <div id='logo'>
                <Link href={'/'}>
                    <img src={'/brand/logo_white.svg'} />
                </Link>
           </div>
           <div id='side-navigation__content'>
            <nav id='nav-links'>
                {
                    urlSet.map((node: URLItem, idx: number) => (
                        <LinkButton 
                            key={idx}
                            label={node.label}
                            href={node.href}
                            Icon={node.icon}
                        />
                    ))
                }
            </nav>
            <footer id='profile-access'>
                <Avatar.Root>
                    <Avatar.Fallback />
                </Avatar.Root>
                <p id='profile-access__username'>Username</p>
                <Button>
                    <UserCog />
                    Profile
                </Button>
            </footer>
           </div>
        </div>
    )
}