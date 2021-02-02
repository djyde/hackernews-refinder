import { Box, Flex, Text, Link } from '@chakra-ui/react'
import * as React from 'react'
import { SearchResult } from '../service'
import dayjs from 'dayjs'

function Group (props: {
  title: string,
  hits?: SearchResult['hits']
}) {
  return (
    <>
      <Box fontSize="sm">
        <Flex fontWeight="bold" px={4} py={2} fontSize="sm" bgColor="orange.300">On this day</Flex>
        <Flex flexDirection="column">
          {props.hits?.map(hit => {
            return (
              <Box key={hit.objectID} bgColor="white" px={4} py={2}>
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

export default Group