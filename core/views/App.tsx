import * as React from 'react'
import { Box, ChakraProvider } from "@chakra-ui/react"
import ThisDay from './ThisDay'
import { QueryClient, QueryClientProvider } from 'react-query'
import Relevant from './Relevant'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

function App() {
  return (
    <>
      <Box width='xl' bgColor='gray.100'>
        <ThisDay />
        <Relevant itemId="23196960" />
      </Box>
    </>
  )
}

export default <QueryClientProvider client={queryClient}>
  <ChakraProvider>
    <App />
  </ChakraProvider>
</QueryClientProvider>
