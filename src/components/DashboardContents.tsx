import React, {useEffect, useState} from 'react'
import {  Grid , Paper, ThemeIcon, Group, ActionIcon, Text, Center } from '@mantine/core';
import {CalendarEvent, ChevronRight, Stack2, Search, AlertTriangle } from 'tabler-icons-react'
import DataTable from '../modules/dashboard/dataTable';
import { pestData } from '../modules/dashboard/dummyData/pestCountDummyData';
import { findingsData } from '../modules/dashboard/dummyData/findingsDummyData';
import { getData } from '../api/clientdb';

interface DataSet {
  'label': string,
  'data': Array<number>,
  'borderColor': string,
  'backgroundColor': string,
}

interface DashboardData {
  'breachCount': string,
  'findingsCount': string,
  'acknowledgeCount': string,
  'nextVisit': string,
  'dailyPestData'?: {
    'labels': string[],
    'datasets': DataSet[]
  },
  'findingsData': {
    'labels': string[],
    'datasets': Object[]
  }
}

const findingsOptions = {
  responsive: false,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Findings (Month)',
    },
  },
};

const pestOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Pest Count',
    },
  },
};

const DashboardContents = () => {
  const [data, setData] = useState<DashboardData>({ 'breachCount': '', 'findingsCount': '', 'acknowledgeCount': '', 'nextVisit': '', 'dailyPestData': { 'labels': [''], 'datasets': [{ 'label': '', 'data': [], 'backgroundColor': '', 'borderColor': '' }] }, 'findingsData': { 'labels': [], 'datasets': [] } })

  const load = () => [
    getData().then(payload => {
      setData(payload);
    }).catch(function (error) {
      console.log(error);
    })
  ]

  useEffect(() => {
    load();
  }, [])
  return (
      <>
          <Grid py="md">
              <Grid.Col md={6} lg={3}>
                  <Paper shadow="md" p="md">
                      <Group spacing='xs'>
                      <ThemeIcon variant="light" radius="xs" size={40}>
                        <CalendarEvent size={20}/>
                          </ThemeIcon>
                          <Group grow direction='column' spacing={0}>
                              <h5 style={{ marginTop: 0, marginBottom: 0}}>{data.nextVisit.toString()}</h5>
                              <Text color="dimmed" size="sm" sx={{ marginTop: 0, marginBottom: 5 }}>Schedule of Next Visit</Text>
                              
                          </Group>
                          <ActionIcon sx={{marginLeft: 'auto'}} size="lg" radius="xs">
                            <ChevronRight />
                        </ActionIcon>
                    </Group>
                  </Paper>
              </Grid.Col>
              <Grid.Col md={6} lg={3}>
                  <Paper shadow="md" p="md">
                  <Group spacing='xs'>
                      <ThemeIcon color="red" variant="light" radius="xs" size={40}>
                        <Stack2 size={20}/>
                          </ThemeIcon>
                          <Group grow direction='column' spacing={0}>
                              <h5 style={{ marginTop: 0, marginBottom: 0}}>{data.acknowledgeCount.toString()}</h5>
                              <Text color="dimmed" size="sm" sx={{ marginTop: 0, marginBottom: 5 }}>S.O. for Acknowledgement</Text>
                              
                          </Group>
                          <ActionIcon sx={{marginLeft: 'auto'}} size="lg" radius="xs">
                            <ChevronRight />
                        </ActionIcon>
                    </Group>
                  </Paper>
              </Grid.Col>
              <Grid.Col md={6} lg={3}>
                  <Paper shadow="md" p="md">
                  <Group spacing='xs'>
                      <ThemeIcon color="yellow" variant="light" radius="xs" size={40}>
                        <Search size={20}/>
                          </ThemeIcon>
                          <Group grow direction='column' spacing={0}>
                              <h5 style={{ marginTop: 0, marginBottom: 0}}>{data.findingsCount.toString()}</h5>
                              <Text color="dimmed" size="sm" sx={{ marginTop: 0, marginBottom: 5 }}>Findings for Acknowledgement</Text>
                              
                          </Group>
                          <ActionIcon sx={{marginLeft: 'auto'}} size="lg" radius="xs">
                            <ChevronRight />
                        </ActionIcon>
                    </Group>
                  </Paper>
              </Grid.Col>
              <Grid.Col md={6} lg={3}>
                  <Paper shadow="md" p="md">
                  <Group spacing='xs'>
                      <ThemeIcon color="gray" variant="light" radius="xs" size={40}>
                        <AlertTriangle size={20}/>
                          </ThemeIcon>
                          <Group grow direction='column' spacing={0}>
                              <h5 style={{ marginTop: 0, marginBottom: 0}}>{data.breachCount}</h5>
                              <Text color="dimmed" size="sm" sx={{ marginTop: 0, marginBottom: 5 }}>Threshold Breach</Text>
                          </Group>
                          <ActionIcon sx={{marginLeft: 'auto'}} size="lg" radius="xs">
                            <ChevronRight />
                        </ActionIcon>
                    </Group>
                  </Paper>
              </Grid.Col>
          </Grid>
          <Grid pb="md">
          <Grid.Col md={12} lg={6}>
                  <Paper shadow="md" p="md">
                    <DataTable chartType={"line"} options={pestOptions} data={data.dailyPestData}  />
                  </Paper>
              </Grid.Col>
              <Grid.Col md={12} lg={6}>
                  <Paper shadow="md" p="md">
                    <Center>
                          <DataTable chartType={"pie"} data={data.findingsData} options={findingsOptions} />
                          </Center>
                  </Paper>
              </Grid.Col>
              <Grid.Col md={12} lg={6}>
                  <Paper shadow="md" p="md">
                    <DataTable chartType={"bar"} options={pestOptions} data={pestData}  />
                  </Paper>
              </Grid.Col>
          </Grid>
          
          
      </>
  )
}

export default DashboardContents