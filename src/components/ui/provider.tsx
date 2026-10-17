"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { arcadia } from "../theme"

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={arcadia}>
      {children}
    </ChakraProvider>
  )
}
