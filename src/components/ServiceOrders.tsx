import React from 'react'
import { Grid, Paper, ThemeIcon, Group, ActionIcon, Text, Divider } from '@mantine/core';
import { CalendarEvent, ChevronRight, Stack2, Search, AlertTriangle } from 'tabler-icons-react';

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
                    <Text size="sm">No records found</Text>
                  </Paper>
              </Grid.Col>
              <Grid.Col md={12} lg={4}>
                  <Paper shadow="md" p="md">
                    <Text size="md">Upcoming Service</Text>
                    <Divider my="sm" />
                    <Text size="sm">No records found</Text>
                  </Paper>
              </Grid.Col>
              <Grid.Col md={12} lg={4}>
                  <Paper shadow="md" p="md">
                    <Text size="md">Past Service Order</Text>
                    <Divider my="sm" />
                    <Text size="sm">No records found</Text>
                  </Paper>
              </Grid.Col>
          </Grid>
      </>
  )
}

export default ServiceOrders