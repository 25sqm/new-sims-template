import React, { useState } from 'react'
import { Tabs, createStyles, Table, Text, Paper, ScrollArea, Button, ThemeIcon, Box } from '@mantine/core';
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
        <Tabs.Tab label="Summary of Devices">Summary of Devices Content</Tabs.Tab>
        </Tabs>
    </Paper>
  )
}

export default Reports