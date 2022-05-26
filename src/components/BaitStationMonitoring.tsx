import React, {useState} from 'react'
import { SimpleGrid, Paper, Text, Select, Group, Button } from '@mantine/core';
import { DateRangePicker } from '@mantine/dates';

const dummyData = {
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    years: ['2017', '2018', '2019', '2020', '2021', '2022'],
    areas: ['All', 'Lobby', 'Training Room', 'Pantry Area'],
    sortTypes: ['Highest', 'Lowest'],
}
const BaitStationMonitoring = () => {
    const [value, setValue] = useState<[Date | null, Date | null]>([
        new Date(2021, 11, 1),
        new Date(2021, 11, 5),
      ]);
  return (
    <SimpleGrid cols={3}>
          <Paper shadow="md" p="sm" my="md" >
              <Text size='md'>Bait Station Activity Per Month</Text>
              <Group grow my='sm'>
                <Select data={dummyData.months} placeholder="Month" />
                <Select data={dummyData.years} placeholder="Year" />
              </Group>
              <Button color="teal">Generate</Button>
      </Paper>
      
          <Paper shadow="md" p="sm" my="md" >
              <Text size='md'>Bait Station Activity Per Area</Text>
              <DateRangePicker label="Date" placeholder="Pick dates range" value={value} onChange={setValue} />
              <Group grow my='sm'>
                <Select data={dummyData.sortTypes} placeholder="Sort" /> 
                <Button color="teal">Generate</Button>
              </Group>
      </Paper>
          
          <Paper shadow="md" p="sm" my="md" >
              <Text size='md'>Bait Station Activity Per Device</Text>
              <Group grow my='sm'>
                <Select data={dummyData.areas} placeholder="Area" />
                <Select data={dummyData.sortTypes} placeholder="Sort" />
              </Group>
              <DateRangePicker my='sm' label="Date" placeholder="Pick dates range" value={value} onChange={setValue} />
              <Button color="teal">Generate</Button>
      </Paper>
    </SimpleGrid>
  )
}

export default BaitStationMonitoring