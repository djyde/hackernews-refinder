import * as React from 'react'
import { Box, ChakraProvider, Flex } from "@chakra-ui/react"
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

  const expanded = {
    top: '0',
    right: '0',
    bottom: '0',
  }

  const collapsed = {
    top: '0',
    right: '-580px',
    bottom: '0', 
  }

  const [isCollapsed, setIsCollapsed] = React.useState(false)

  return (
    <>
      <Flex position="fixed" overflow="scroll" {...(isCollapsed ? collapsed : expanded)}   width='600px'>
        <Box width="20px" onClick={_ => setIsCollapsed(!isCollapsed)}>
          Close
        </Box>
        <Box flex='1' borderLeft="1px" borderColor="orange.100" bgColor="rgb(246, 246, 239)">
          <ThisDay />
          <Relevant itemId="23196960" />
        </Box>
      </Flex>
    </>
  )
}

export default <QueryClientProvider client={queryClient}>
  <ChakraProvider>
    <App />
  </ChakraProvider>
</QueryClientProvider>
