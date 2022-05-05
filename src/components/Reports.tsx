import React, { useState } from 'react'
import { Tabs, createStyles, Table, Text, Paper, ScrollArea, Button, ThemeIcon, Box, Group, MultiSelect, Input } from '@mantine/core';
import { DateRangePicker } from '@mantine/dates';
import { Check, X } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

const inspectionReports = [
  {
    serviceOrder: '617',
    serviceType: 'GENERAL PEST CONTROL',
    dateTime: new Date('2022-12-02 06:35:23'),
    acknowledged: false,
    status: 'Finished',
  },
  {
    serviceOrder: '1035',
    serviceType: 'GENERAL PEST CONTROL',
    dateTime: new Date('2022-02-12 06:35:23'),
    acknowledged: true,
    status: '',
  },
  {
    serviceOrder: '1131',
    serviceType: 'GENERAL PEST CONTROL',
    dateTime: new Date('2022-04-30 06:35:23'),
    acknowledged: false,
    status: 'Finished',
  },
] 

const deviceSummary = [
  {
    deviceCode: 'STX-MQT-1712-0002-OPSQA-TRO-002',
    deviceType: 'Mosquito Trap',
    deviceLocation: 'Training Room',
    dateDeployed: new Date('2021-02-12'),
    status: 'Not Inspected'
  },
  {
    deviceCode: 'STX-MQT-1712-0001-OPSQA-PAN-001',
    deviceType: 'Mosquito Trap',
    deviceLocation: 'Pantry Area',
    dateDeployed: new Date('2022-04-12'),
    status: 'Not Inspected'
  },
  {
    deviceCode: 'STX-RBT-1712-1000',
    deviceType: 'Rodent Bait Station (Tamper Proof)',
    deviceLocation: 'Pantry Area',
    dateDeployed: new Date('2022-02-02'),
    status: '	Good Working Condition'
  }
]

const InspectionTables = () => {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
  
  const rows = inspectionReports.map((entry) => (
    <tr key={entry.serviceOrder}>
      <td>
      <Button  variant="subtle" size="xs">
        View Device Report
        </Button>
        <Button  variant="subtle" size="xs">
        View Sighting Report
      </Button>
      </td>
      <td>{entry.serviceOrder}</td>
      <td>{entry.serviceType}</td>
      <td>{entry.dateTime.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })}</td>
      <td>{(entry.acknowledged) ? <ThemeIcon variant="outline" radius="md" size="sm" color="green"><Check /></ThemeIcon> : <ThemeIcon variant="outline" radius="md" size="sm" color="red"><X /></ThemeIcon>}</td>
      <td>{entry.status}</td>
    </tr>
  ))
  return (
    <ScrollArea sx={{ height: '72vh' }} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
      <Table sx={{ minWidth: 700 }} striped highlightOnHover>
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            <th>View</th>
            <th>Service Order Number</th>
            <th>Service Type</th>
            <th>Date</th>
            <th>Acknowledged</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  )
}

const dummyQuery = {
  areas: [ 
    { value: 'trainingRoom', label: 'Training Room' },
    { value: 'pantryArea', label: 'Pantry Area' },
    { value: 'lobby', label: 'Lobby' },
  ],
  deviceTypes: [ 
    { value: 'birdScare', label: 'Bird Scare' },
    { value: 'catTrap', label: 'Cat Trap' },
    { value: 'glueTrap', label: 'Glue Trap' },
    { value: 'mosquitoTrap', label: 'Mosquito Trap' },
  ],
  deviceStatus: [ 
    { value: 'blocked', label: 'Blocked' },
    { value: 'bustedBulb', label: 'Busted ILD Bulb' },
    { value: 'damaged', label: 'Damaged' },
    { value: 'missing', label: 'Missing' },
    { value: 'needsRepair', label: 'Needs Repair' },
  ]
}

const SummaryDevices = () => {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);

  const rows = deviceSummary.map((entry) => (
    <tr key={entry.deviceCode}>
      <td>{entry.deviceCode}</td>
      <td>{entry.deviceType}</td>
      <td>{entry.deviceLocation}</td>
      <td>{entry.dateDeployed.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })}</td>
      <td>{entry.status}</td>
    </tr>
  ))
  return (
    <>
      <Group>
        <Input placeholder="Device Code" />
                  <MultiSelect
                    data={dummyQuery.areas}
                    placeholder="Area"
                    />
                    <MultiSelect
                                data={dummyQuery.deviceTypes}
                                placeholder="Device Type"
                              />
                  <MultiSelect
                    data={dummyQuery.deviceStatus}
                    placeholder="Device Status"
                  />
      </Group>
      <ScrollArea sx={{ height: '68vh' }} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
      <Table sx={{ minWidth: 700 }} striped highlightOnHover>
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            <th>Device Code</th>
            <th>Device Type</th>
            <th>Device Location</th>
            <th>Date Deployed</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
    </>
  )
}

const Reports = () => {
  return (
    <Paper shadow="md" p="sm" my="md" >
      <Text size="xl">Reports</Text>
      <Tabs>
        <Tabs.Tab label="Inspection Reports"><InspectionTables /></Tabs.Tab>
        <Tabs.Tab label="Treatment Reports">
        <Box
          sx={(theme) => ({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
            textAlign: 'center',
            padding: theme.spacing.xl,
            borderRadius: theme.radius.md,
            cursor: 'pointer',

            '&:hover': {
              backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
            },
          })}
        >
          <Text weight={700} size="xl">Future Functionality</Text>
        </Box>
        </Tabs.Tab>
        <Tabs.Tab label="Summary of Devices"><SummaryDevices /></Tabs.Tab>
        </Tabs>
    </Paper>
  )
}

export default Reports