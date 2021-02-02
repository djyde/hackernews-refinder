import { Badge, Box, Flex, Link, Stack, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'
import * as React from 'react'
import { useQuery } from 'react-query'
import Group from '../components/Group'
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
      <Group title="This Day" hits={getTodayQuery.data} />
    </>
  )
}

export default ThisDay