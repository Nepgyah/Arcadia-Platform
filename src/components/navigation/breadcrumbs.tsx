import { useBreadcrumbStore } from "@/app/store/store";
import { Breadcrumb } from "@chakra-ui/react";

export default function Breadcrumbs() {
    const breadcrumbs = useBreadcrumbStore((state) => state.crumbs)

    return (
        <Breadcrumb.Root>
            <Breadcrumb.List>
                {
                    breadcrumbs.map((crumb: string, idx: number) => {
                        if(idx != breadcrumbs.length - 1) {
                            return (
                                <>
                                    <Breadcrumb.Item key={idx}>
                                        <Breadcrumb.Link>{crumb}</Breadcrumb.Link>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Separator />
                                </>
                            )
                        } else {
                            return (
                                <Breadcrumb.Item key={idx}>
                                    <Breadcrumb.Link>{crumb}</Breadcrumb.Link>
                                </Breadcrumb.Item>
                            )

                        }
                    })
                }
            </Breadcrumb.List>
        </Breadcrumb.Root>
    )
}