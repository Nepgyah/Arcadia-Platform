import SetBreadcrumbs from "@/components/navigation/setBreadcrumbs";

export default function Home() {
    return (
        <div>
            <SetBreadcrumbs breadcrumbs={['Home']} />
        </div>
    )
}