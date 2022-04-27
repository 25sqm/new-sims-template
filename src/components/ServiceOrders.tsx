import React from 'react'
import { Grid, Paper, ThemeIcon, Group, ActionIcon, Text, Divider, Box, Button, Tooltip } from '@mantine/core';
import { CalendarEvent, ChevronRight, Stack2, Search, AlertTriangle, Pencil, File, ClearAll } from 'tabler-icons-react';

const forAckData : Array<any> = [{
        dateTime: new Date('2022-04-26 06:35:23'),
        serviceOrder: 1102,
    },
    {
        dateTime: new Date('2022-02-02 06:35:23'),
        serviceOrder: 1035,
    }
]

const upcomingServiceData : Array<any> = [
    {
        dateTime: new Date('2022-11-26 06:35:23'),
        serviceOrder: 1152,
    },{
        dateTime: new Date('2022-12-02 06:35:23'),
        serviceOrder: 1155,
    },
]

const pastService : Array<any> = [
    {
        dateTime: new Date('2021-12-16 06:35:23'),
        serviceOrder: 1152,
    },{
        dateTime: new Date('2021-03-05 06:35:23'),
        serviceOrder: 1155,
    },
]

function ServiceOrders() {
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
                              <h5 style={{ marginTop: 0, marginBottom: 0}}>None</h5>
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
                              <h5 style={{ marginTop: 0, marginBottom: 0}}>3</h5>
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
                              <h5 style={{ marginTop: 0, marginBottom: 0}}>0</h5>
                              <Text color="dimmed" size="sm" sx={{ marginTop: 0, marginBottom: 5 }}>Upcoming Service</Text>
                              
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
                              <h5 style={{ marginTop: 0, marginBottom: 0}}>0</h5>
                              <Text color="dimmed" size="sm" sx={{ marginTop: 0, marginBottom: 5 }}>Cancelled S.O.</Text>
                          </Group>
                          <ActionIcon sx={{marginLeft: 'auto'}} size="lg" radius="xs">
                            <ChevronRight />
                        </ActionIcon>
                    </Group>
                  </Paper>
              </Grid.Col>
          </Grid>
          <Grid pb="md">
          <Grid.Col md={12} lg={4}>
                  <Paper shadow="md" p="md">
                    <Text size="md">For Acknowledgement</Text>
                      <Divider my="sm" />
                      {(forAckData.length === 0) ?  <Text size='sm'>No Records Found</Text> : forAckData.map((entry) => (
                          <Box sx={(theme) => ({
                            display: 'block',
                            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                            color: theme.colorScheme === 'dark' ? theme.colors.blue[4] : theme.colors.blue[7],
                            textAlign: 'left',
                            padding: theme.spacing.sm,
                            marginTop: theme.spacing.sm,
                            marginBottom: theme.spacing.sm,
                            borderRadius: theme.radius.xs,
                            cursor: 'pointer',
                    
                            '&:hover': {
                              backgroundColor:
                                theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
                            },
                          })}>
                              <Group spacing='sm' grow>
                                  <Text size='sm' weight={500}>{entry.dateTime.toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}</Text>
                                  <Text size='sm'>{entry.serviceOrder}</Text>
                                  <Group direction='row' spacing='xs'>
                                        <Tooltip
                                        label="Edit"
                                        radius="xs"
                                        withArrow
                                        >
                                          <Button size='xs'><Pencil size={15} /></Button>
                                      </Tooltip>
                                      <Tooltip
                                        label="Acknowledgement and Feedback"
                                        radius="xs"
                                        withArrow
                                        >
                                      <Button size='xs'><File size={15} /></Button>
                                      </Tooltip>
                                  </Group>
                              </Group>
                        </Box>
                    ))}
                  </Paper>
              </Grid.Col>
              <Grid.Col md={12} lg={4}>
                  <Paper shadow="md" p="md">
                    <Text size="md">Upcoming Service</Text>
                    <Divider my="sm" />
                    {(upcomingServiceData.length === 0) ?  <Text size='sm'>No Records Found</Text> : upcomingServiceData.map((entry) => (
                          <Box sx={(theme) => ({
                            display: 'block',
                            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                            color: theme.colorScheme === 'dark' ? theme.colors.blue[4] : theme.colors.blue[7],
                            textAlign: 'left',
                            padding: theme.spacing.sm,
                            marginTop: theme.spacing.sm,
                            marginBottom: theme.spacing.sm,
                            borderRadius: theme.radius.xs,
                            cursor: 'pointer',
                    
                            '&:hover': {
                              backgroundColor:
                                theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
                            },
                          })}>
                              <Group spacing='sm' grow>
                                  <Text size='sm' weight={500}>{entry.dateTime.toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}</Text>
                                  <Text size='sm'>{entry.serviceOrder}</Text>
                                  <Button size='xs' leftIcon={<Pencil size={15} />}>Edit S.O.</Button>
                              </Group> 
                        </Box>
                    ))}
                  </Paper>
              </Grid.Col>
              <Grid.Col md={12} lg={4}>
                  <Paper shadow="md" p="md">
                    <Text size="md">Past Service Order</Text>
                    <Divider my="sm" />
                    {(pastService.length === 0) ?  <Text size='sm'>No Records Found</Text> : pastService.map((entry) => (
                          <Box sx={(theme) => ({
                            display: 'block',
                            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                            color: theme.colorScheme === 'dark' ? theme.colors.blue[4] : theme.colors.blue[7],
                            textAlign: 'left',
                            padding: theme.spacing.sm,
                            marginTop: theme.spacing.sm,
                            marginBottom: theme.spacing.sm,
                            borderRadius: theme.radius.xs,
                            cursor: 'pointer',
                    
                            '&:hover': {
                              backgroundColor:
                                theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
                            },
                          })}>
                              <Group spacing='sm' grow>
                                  <Text size='sm' weight={500}>{entry.dateTime.toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}</Text>
                                  <Text size='sm'>{entry.serviceOrder}</Text>
                                  <Button size='xs' leftIcon={<ClearAll size={15} />}>Clear Order</Button>
                              </Group> 
                        </Box>
                    ))}
                  </Paper>
              </Grid.Col>
          </Grid>
      </>
  )
}

export default ServiceOrders