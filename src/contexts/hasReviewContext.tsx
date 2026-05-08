import { MediaReview } from "@/types/base"
import { createContext } from "react"

interface ContextProps {
    hasReview: boolean,
    setHasReview: (hasReview: boolean) => void
}
export const MediaReviewContext = createContext<ContextProps | null>(null)

export default function MediaReviewContextWrapper(
    {
        hasReview,
        setHasReview,
        children
    } : {
        hasReview: boolean,
        setHasReview: (hasReview: boolean) => void,
        children: React.ReactNode
    }
) {
    return (
        <MediaReviewContext.Provider value={{hasReview, setHasReview}}>
            {children}
        </MediaReviewContext.Provider>
    )
}