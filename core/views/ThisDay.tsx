import { Badge, Box, Flex, Link, Stack, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'
import * as React from 'react'
import { useQuery } from 'react-query'
import Group from '../components/Group'
import { getToday } from '../service'

function ThisDay(props: {
  tag: string
}) {

  const getTodayQuery = useQuery(['getToday', props.tag], async () => {
    const res = await getToday(props.tag)
    return res
  })

  async function init() {
  }

  React.useEffect(() => {
    // init()
  }, [])

  return (
    <>
      <Group isLoading={getTodayQuery.isLoading} title="On This Day" hits={getTodayQuery.data} />
    </>
  )
}

export default ThisDay