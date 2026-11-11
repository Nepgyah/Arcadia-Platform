import { EmptyState, VStack } from "@chakra-ui/react";

export default function NotFound() {

    return (
        <EmptyState.Root>
            <EmptyState.Content>
                <EmptyState.Indicator>
                    <img src={'/pages/miru/anime-not-found.png'} />
                </EmptyState.Indicator>
                <VStack textAlign="center">
                <EmptyState.Title>Anime Not Found</EmptyState.Title>
                <EmptyState.Description>
                    It seems the anime you requested got lost in a filler episode!
                </EmptyState.Description>
                </VStack>
            </EmptyState.Content>
        </EmptyState.Root>

    )
}