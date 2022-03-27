import React, { useState } from 'react'
import { Paper, Group, Text, MultiSelect, Divider  } from '@mantine/core';
import { DateRangePicker } from '@mantine/dates';

const data = [
    { value: 'new', label: 'New' },
    { value: 'analyzed', label: 'Analyzed' },
    { value: 'acknowledged', label: 'Acknowledged' },
];

const areaData = [
    { value: 'Lobby-Level7', label: 'Lobby - Level 7' },
    { value: 'PantryArea-Level7', label: 'Pantry Area - Level 7' },
    { value: 'TrainingRoom-Level7', label: 'Training Room - Level 7' },
];

const ThresholdBreaches = () => {
    const [value, setValue] = useState<[Date | null, Date | null]>();
  return (
      <>
          <Paper shadow="md" p="sm" my="md" sx={{ height: "83vh" }}>
          <Text size="xl">Threshold Breach Incident</Text>
          <Divider my="sm" />
            <Group>
                  <MultiSelect
                    data={data}
                    placeholder="Status"
                  />
                  <DateRangePicker
                    placeholder="Date Range"
                    value={value}
                    onChange={setValue}
                    />
                  <MultiSelect
                    data={areaData}
                    placeholder="Area"
                  />
            </Group>
          </Paper>
      </>
  )
}

export default ThresholdBreaches