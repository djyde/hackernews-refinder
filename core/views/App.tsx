import * as React from 'react'
import { Box, ChakraProvider, Flex } from "@chakra-ui/react"
import ThisDay from './ThisDay'
import { QueryClient, QueryClientProvider } from 'react-query'
import Relevant from './Relevant'
import qs from 'query-string'
import { ArrowRightIcon, ArrowLeftIcon} from '@chakra-ui/icons'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

const url = new URL(location.href)

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

  const views = React.useMemo(() => {
    console.log(url.pathname)
    switch (url.pathname) {
      case '/item':
        const query = qs.parse(location.search)
        return <>
          <Relevant itemId={query.id as string} />
        </>
      case '/show':
        return <>
          <ThisDay tag="show_hn" />
        </>
      default:
        return <>
          <ThisDay tag="story" />
        </>
    }
  }, [])

  return (
    <>
      <Flex position="fixed" overflow="scroll" {...(isCollapsed ? collapsed : expanded)}   width='600px'>
        <Box width="20px" onClick={_ => setIsCollapsed(!isCollapsed)} >
          <Box bgColor="white" p={2} textAlign="center" cursor="pointer">
            {isCollapsed ? <ArrowLeftIcon w={2} h={2} /> : <ArrowRightIcon w={2} h={2} />}
          </Box>
        </Box>
        <Box flex='1' borderLeft="1px" borderColor="orange.100" bgColor="rgb(246, 246, 239)">
          {views}
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
