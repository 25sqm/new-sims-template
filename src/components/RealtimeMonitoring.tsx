import React from 'react'
import {ArrowUpCircle, DeviceMobile } from 'tabler-icons-react'
import { Paper, Text, Grid, Group, ThemeIcon, Button, Divider } from '@mantine/core';
import {SingleTable} from '../modules/SingleTable'

const data = [{}];
const tableHeadings = ['Service Order', 'Area', 'Device Code', 'Condition', 'Activity', 'Image', 'Timestamp']

const RealtimeMonitoring = () => {
  return (
    <>
          <Paper shadow="md" p="sm" my="md" >
          <Text size="xl">Realtime Monitoring</Text>
              <Grid py="md">
              <Grid.Col md={6} lg={9}>
                  <Paper p="md" withBorder>
                      <Group>
                      <ThemeIcon color="red" variant="light" radius="xs" size={36}>
                        <DeviceMobile size={40}/>
                          </ThemeIcon>
                          <Group grow direction='column' spacing={0}>
                            <Text size='xl' weight={500}>Device Inspection</Text>
                          </Group>
                          </Group>
                          <Divider my="sm" />
                          <SingleTable listData={data} tableHeadings={tableHeadings} />
                  </Paper>
              </Grid.Col>
              <Grid.Col md={6} lg={3}>
                  <Paper p="md" withBorder>
                  <Group>
                      <ThemeIcon color="yellow" variant="light" radius="xs" size={36}>
                        <ArrowUpCircle size={40}/>
                          </ThemeIcon>
                          <Group grow direction='column' spacing={0}>
                            <Text size='lg' weight={500}>Ongoing Sterix Activity</Text>
                          </Group>
                              <div>No Activity Today.</div>    
                              <Group grow direction='row'>
                              <Button>
                                View Report
                                  </Button>
                                  <Button>
                                Feedback
                              </Button>
                            </Group>
                    </Group>
                  </Paper>
              </Grid.Col>
              </Grid>
              
          </Paper>
          
      </>
  )
}

export default RealtimeMonitoring