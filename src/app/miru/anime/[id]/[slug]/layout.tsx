import { notFound } from "next/navigation"
import { GetAnimeAction } from "./action"

import "@/styles/layout/_media-details.scss";
import "@/styles/pages/miru/detail.scss";
import IconTabButton, { IconTabButtonProps } from "@/components/ui/button/iconTabButton";
import { BarChart3, Info, Users } from "lucide-react";

export default async function Layout(
    {
        children, params
    } : {
        children: React.ReactNode,
        params: Promise<{id: string, slug: string}>
    }
) {
    const { id, slug } = await params
    const result = await GetAnimeAction(Number(id))

    if (!result) {
        notFound()
    }
    
    const anime = result.miru.anime

    return (
        <div id="layout-anime-details" className="media-details">
            <div id="header" className="has-mask arc-card">
                <img src={anime?.bannerImageUrl} />
                <div className="mask mask--gradient"></div>
                <p id="anime-title">{anime?.title}</p>
            </div>

            <div id="media-layout">

                <div id="media-sidebar">
                    meta data
                </div>
                <div id="media-content">
                    <div id="media-tabs">
                        {
                            animeDetailLinks.map((link: Omit<IconTabButtonProps, 'app'>, idx: number) => (
                                <IconTabButton 
                                    key={link.label}
                                    app="miru"
                                    label={link.label}
                                    href={`/miru/anime/${anime?.id}/${anime?.slug}/${link.href}`}
                                    icon={link.icon}
                                />
                            ))
                        }
                    </div>
                    <div id="media-children">
                        {children}

                    </div>
                </div>
            </div>
        </div>
    )
}

const animeDetailLinks: Omit<IconTabButtonProps, 'app'>[] = [
    {
        label: 'Overview',
        href: '',
        icon: <Info />
    },
    {
        label: 'Characters',
        href: 'characters',
        icon: <Users />
    },
    {
        label: 'Stats',
        href: 'stats',
        icon: <BarChart3 />
    }
]