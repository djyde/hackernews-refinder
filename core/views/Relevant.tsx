import { Badge, Box, Flex, Link, Stack, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'
import * as React from 'react'
import { useQuery } from 'react-query'
import { getItem, getToday, searchByUrl } from '../service'

function Relevant(props: {
  itemId: string
}) {

  const getRelevantByUrl = useQuery(['getRelevant', props.itemId], async () => {
    const item = await getItem(props.itemId)
    const matched = await searchByUrl(item.url)

    return matched
  })

  async function init() {
  }

  React.useEffect(() => {
    // init()
  }, [])

  return (
    <>
      <Box fontSize="sm">
        <Flex fontWeight="bold" p={2} fontSize="sm">Relevant</Flex>
        <Flex flexDirection="column">
          {getRelevantByUrl.data?.map(hit => {
            return (
              <Box key={hit.objectID} bgColor="white" p={2}>
                <Box>
                  <Flex gridGap={2}>
                    <Text>
                      {hit.points}
                    </Text>
                    <Text fontWeight="medium">
                      <Link isExternal href={`https://news.ycombinator.com/item?id=${hit.objectID}`}>{hit.title}</Link>
                    </Text>
                  </Flex>
                  <Flex color="gray.500" gridGap={2}>
                    <Text>
                      {dayjs(hit.created_at).format('YYYY-MM-DD HH:mm')}
                    </Text>
                    <Text>{hit.author}</Text>
                  </Flex>
                </Box>
              </Box>
            )
          })}
        </Flex>
      </Box>
    </>
  )
}

export default Relevant