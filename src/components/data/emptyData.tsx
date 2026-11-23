import { EmptyState, VStack } from "@chakra-ui/react";
import { LucideIcon } from "lucide-react";

interface Props {
    icon: LucideIcon,
    title: string,
    description?: string
}
export default function EmptyData(props: Props) {
    
    return (
        <EmptyState.Root className="arc-empty-data">
        <EmptyState.Content>
            <EmptyState.Indicator>
            <props.icon />
            </EmptyState.Indicator>
            <VStack textAlign="center">
                <EmptyState.Title color={'white'}>{props.title}</EmptyState.Title>
                <EmptyState.Description>{props.description}</EmptyState.Description>
            </VStack>
        </EmptyState.Content>
        </EmptyState.Root>
    )
}