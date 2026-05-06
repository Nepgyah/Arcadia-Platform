import { useBreadcrumbStore } from "@/app/store/store";
import { Breadcrumb } from "@chakra-ui/react";
import React from "react";

export default function Breadcrumbs() {
    const breadcrumbs = useBreadcrumbStore((state) => state.crumbs)

    return (
        <Breadcrumb.Root>
            <Breadcrumb.List>
                {
                    breadcrumbs.map((crumb: string, idx: number) => {
                        if(idx != breadcrumbs.length - 1) {
                            return (
                                <React.Fragment key={idx}>
                                    <Breadcrumb.Item>
                                        <Breadcrumb.Link>{crumb}</Breadcrumb.Link>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Separator />
                                </React.Fragment>
                            )
                        } else {
                            return (
                                <React.Fragment key={idx}>
                                    <Breadcrumb.Item>
                                        <Breadcrumb.Link>{crumb}</Breadcrumb.Link>
                                    </Breadcrumb.Item>
                                </React.Fragment>
                            )

                        }
                    })
                }
            </Breadcrumb.List>
        </Breadcrumb.Root>
    )
}