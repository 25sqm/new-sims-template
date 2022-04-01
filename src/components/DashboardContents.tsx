import React from 'react'
import {  Grid , Paper, ThemeIcon, Group, ActionIcon, Text, Center } from '@mantine/core';
import {CalendarEvent, ChevronRight, Stack2, Search, AlertTriangle } from 'tabler-icons-react'
import DataTable from '../modules/dashboard/dataTable';
import { pestOptions, pestData } from '../modules/dashboard/dummyData/pestCountDummyData';
import { findingsData, findingsOptions } from '../modules/dashboard/dummyData/findingsDummyData';

const DashboardContents = () => {
    
  return (
      <>
          <Grid py="md">
              <Grid.Col md={6} lg={3}>
                  <Paper shadow="md" p="md">
                      <Group>
                      <ThemeIcon variant="light" radius="xs" size={60}>
                        <CalendarEvent size={40}/>
                          </ThemeIcon>
                          <Group grow direction='column' spacing={0}>
                              <h5 style={{ marginTop: 0, marginBottom: 5}}>March 26, 2022</h5>
                              <Text color="dimmed" size="sm" sx={{ marginTop: 0, marginBottom: 5 }}>Schedule of Next Visit</Text>
                              
                          </Group>
                          <ActionIcon sx={{marginLeft: 'auto'}} size="xl" radius="xs">
                            <ChevronRight />
                        </ActionIcon>
                    </Group>
                  </Paper>
              </Grid.Col>
              <Grid.Col md={6} lg={3}>
                  <Paper shadow="md" p="md">
                  <Group>
                      <ThemeIcon color="red" variant="light" radius="xs" size={60}>
                        <Stack2 size={40}/>
                          </ThemeIcon>
                          <Group grow direction='column' spacing={0}>
                              <h5 style={{ marginTop: 0, marginBottom: 5}}>3</h5>
                              <Text color="dimmed" size="sm" sx={{ marginTop: 0, marginBottom: 5 }}>S.O. for Acknowledgement</Text>
                              
                          </Group>
                          <ActionIcon sx={{marginLeft: 'auto'}} size="xl" radius="xs">
                            <ChevronRight />
                        </ActionIcon>
                    </Group>
                  </Paper>
              </Grid.Col>
              <Grid.Col md={6} lg={3}>
                  <Paper shadow="md" p="md">
                  <Group>
                      <ThemeIcon color="yellow" variant="light" radius="xs" size={60}>
                        <Search size={40}/>
                          </ThemeIcon>
                          <Group grow direction='column' spacing={0}>
                              <h5 style={{ marginTop: 0, marginBottom: 5}}>5</h5>
                              <Text color="dimmed" size="sm" sx={{ marginTop: 0, marginBottom: 5 }}>Findings for Acknowledgement</Text>
                              
                          </Group>
                          <ActionIcon sx={{marginLeft: 'auto'}} size="xl" radius="xs">
                            <ChevronRight />
                        </ActionIcon>
                    </Group>
                  </Paper>
              </Grid.Col>
              <Grid.Col md={6} lg={3}>
                  <Paper shadow="md" p="md">
                  <Group>
                      <ThemeIcon color="gray" variant="light" radius="xs" size={60}>
                        <AlertTriangle size={40}/>
                          </ThemeIcon>
                          <Group grow direction='column' spacing={0}>
                              <h5 style={{ marginTop: 0, marginBottom: 5}}>76/76</h5>
                              <Text color="dimmed" size="sm" sx={{ marginTop: 0, marginBottom: 5 }}>Threshold Breach</Text>
                          </Group>
                          <ActionIcon sx={{marginLeft: 'auto'}} size="xl" radius="xs">
                            <ChevronRight />
                        </ActionIcon>
                    </Group>
                  </Paper>
              </Grid.Col>
          </Grid>
          <Grid pb="md">
          <Grid.Col md={12} lg={6}>
                  <Paper shadow="md" p="md">
                    <DataTable chartType={"line"} options={pestOptions} data={pestData}  />
                  </Paper>
              </Grid.Col>
              <Grid.Col md={12} lg={6}>
                  <Paper shadow="md" p="md">
                    <Center>
                          <DataTable chartType={"pie"} data={findingsData} options={findingsOptions} />
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