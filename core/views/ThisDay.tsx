import { Badge, Box, Flex, Link, Stack, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'
import * as React from 'react'
import { useQuery } from 'react-query'
import { getToday } from '../service'

function ThisDay() {

  const getTodayQuery = useQuery(['getToday', 'story'], async () => {
    const res = await getToday('story')
    return res
  })

  async function init() {
  }

  React.useEffect(() => {
    // init()
  }, [])

  return (
    <>
      <Box fontSize="sm">
        <Flex fontWeight="bold" p={2} fontSize="sm">On this day</Flex>
        <Flex flexDirection="column">
          {getTodayQuery.data?.map(hit => {
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

export default ThisDay