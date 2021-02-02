import { Badge, Box, Flex, Link, Stack, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'
import * as React from 'react'
import { useQuery } from 'react-query'
import Group from '../components/Group'
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
      <Group title="Relevant" hits={getRelevantByUrl.data} />
    </>
  )
}

export default Relevant