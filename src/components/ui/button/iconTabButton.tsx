'use client';

import { usePathname } from 'next/navigation';
import { AppType } from "@/types/arcadia";
import Link from "next/link";

import '@/styles/components/buttons/_icon-tab-button.scss';

export interface IconTabButtonProps {
    app: AppType;
    label: string;
    href: string;
    icon: React.ReactNode; // Changed from Icon: LucideIcon
}

export default function IconTabButton({ app, label, href, icon }: IconTabButtonProps) {
    const pathname = usePathname();

    const currentSegment = pathname.split('/').filter(Boolean).pop() || '';
    const targetSegment = href.split('/').filter(Boolean).pop() || '';
    const active = currentSegment === targetSegment;

    return (
        <Link href={href}>
            <div className={`icon-tab-button icon-tab-button--${app} ${active ? 'icon-tab-button--active' : 'icon-tab-button--inactive'}`}>
                <div className="icon-tab-button__icon">
                    {icon}
                </div>
                <div className="icon-tab-button__label box-shadow">
                    <p>{label}</p>
                </div>
            </div>
        </Link>
    );
}