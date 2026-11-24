import { notFound } from "next/navigation"
import { GetAnimeAction } from "./action"

import IconTabButton, { IconTabButtonProps } from "@/components/ui/button/iconTabButton";
import { BarChart3, Info, Users } from "lucide-react";
import GetFranchiseAction from "@/actions/franchise/getFranchiseAction";
import SectionHeader from "@/components/layout/sectionHeader";
import StatCard from "@/components/cards/StatCard/StatCard";
import FranchiseCard from "@/components/cards/FranchiseCard/FranchiseCard";
import StatText from "@/components/data/StatText/StatText";
import { Company } from "@/types/base";

import "@/styles/layout/_media-details.scss";
import "@/styles/pages/miru/detail.scss";

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

    let franchisePromise = null
    if (anime.franchise) {
        franchisePromise = GetFranchiseAction(anime.franchise.id)
    }

    return (
        <div id="layout-anime-details" className="media-details page-spacing">
            <div id="header">
                <div id="media-banner" className="has-mask arc-card">
                    <img src={anime?.bannerImageUrl} />
                    <div className="mask mask--gradient"></div>
                    <div id="media-banner__text">
                        <p id="media-banner__main-title">{anime?.title}</p>
                        <p id="media-banner__sub-title">{anime?.titleNative}</p>
                    </div>
                </div>
                <div id="franchise">
                    <FranchiseCard franchisePromise={franchisePromise} />
                </div>
            </div>
            <div id="sub-header">
                <div id="latest" className="arc-card">
                    Latest
                </div>
                <div id="stats">
                    <StatCard 
                        label="Arcadia Rankings"
                        value={`Users: ${anime.users}\nRating: ${anime.rating}`}
                        icon={<Users />}
                        opacity={.25}
                        notes="Last Updated: TBD"
                    />
                    <StatCard 
                        label="Anilist Rankings"
                        value={anime.anilistData ? `Score: ${anime.anilistData.rankScore}\nPopularity: ${anime.anilistData.rankPopular}`: 'No rank found'}
                        icon={<img src={'/assets/partner-logos/anilist-logo.svg'} />}
                        opacity={.5}
                        notes="Last Updated: TBD"
                    />
                    <StatCard 
                        label="MAL Rankings"
                        value={anime.malData ? `Score: ${anime.malData?.rankScore}\nPopularity: ${anime.malData?.rankPopular}` : 'No rank found'}
                        icon={<img src={'/assets/partner-logos/mal-logo.svg'} />}
                        opacity={.5}
                        notes="Last Updated: TBD"
                    />
                </div>
            </div>
            <div id="media-layout">

                <div id="media-sidebar">
                    <div id="misc-information">
                        <SectionHeader title="Metadata" />
                        <div className="media-details__list">
                            <StatText label="Type" value={anime.type} />
                            <StatText label="Season" value={anime.season} />
                            <StatText label="Rating" value={anime.rating} />
                            <StatText label="Start Date" value={anime.airingStartDate} />
                            <StatText label="End Date" value={anime.airingEndDate} />
                        </div>
                    </div>
                    <div id="production">
                        <SectionHeader title="Production" />
                        <div className="media-details__list">
                            {
                                anime.producer.map((producer: Company) => (
                                    <p key={producer.slug}>{producer.name}</p>
                                ))
                            }
                        </div>
                    </div>
                    <div id="studios">
                        <SectionHeader title="Studios" />
                        <div className="media-details__list">
                            {
                                anime.studio.map((studio: Company) => (
                                    <p key={studio.slug}>{studio.name}</p>
                                ))
                            }
                        </div>
                    </div>
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