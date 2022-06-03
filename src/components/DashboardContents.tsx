import React, {useEffect, useState} from 'react'
import {  Grid , Paper, ThemeIcon, Group, ActionIcon, Text, Center, SimpleGrid, ScrollArea, Title, Table, Avatar, Divider, LoadingOverlay } from '@mantine/core';
import {CalendarEvent, ChevronRight, Stack2, Search, AlertTriangle, ExclamationMark } from 'tabler-icons-react'
import DataTable from '../modules/dashboard/dataTable';
import { getData } from '../api/clientdb';

// Interfaces
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

interface IPMDeviceHealth {
  "device_type_name":string,
     "good": number | string,
     "damaged":number | string,
     "for_repair":number | string,
     "blocked":number | string,
     "total":number
}

interface PestCountMetric {
  "pest_type_name":string,
     "today":string,
     "yesterday":string,
     "this_week":string,
     "last_week":string
}

interface CriticalFinding {
  "reference_no":number,
     "service_order_id":number,
     "Timestamp":string,
     "findings":string,
     "proposed_action":string,
     "area":string,
     "status":string,
     "action_taken":string,
     "actiontaken_by_client":string,
     "person_in_charge":string,
     "risk_assessment":string,
     "client_location_name":string
}

// Interfaces END

// Chart Options

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

// Chart Options END


// DATA

const deviceHealth : IPMDeviceHealth[] = [
  {
     "device_type_name":"Cage Trap (Big)",
     "good":1,
     "damaged":"0",
     "for_repair":"0", 
     "blocked":"1",
     "total":2
  },
  {
     "device_type_name":"Glue Trap",
     "good":2,
     "damaged":"0",
     "for_repair":"0",
     "blocked":"0",
     "total":2
  },
  {
     "device_type_name":"Rodent Bait Station (Tamper Proof)",
     "good":1,
     "damaged":"0",
     "for_repair":"0",
     "blocked":"0",
     "total":1
  },
  {
     "device_type_name":"Insect Light Trap",
     "good":1,
     "damaged":"0",
     "for_repair":"0",
     "blocked":"0",
     "total":1
  }
]

const pestCountMetric : PestCountMetric[] = [
  {
     "pest_type_name":"Flying Insects",
     "today":"0",
     "yesterday":"0",
     "this_week":"0",
     "last_week":"0"
  },
  {
     "pest_type_name":"Roaches",
     "today":"0",
     "yesterday":"0",
     "this_week":"0",
     "last_week":"0"
  },
  {
     "pest_type_name":"Wildlife",
     "today":"0",
     "yesterday":"0",
     "this_week":"0",
     "last_week":"0"
  },
  {
     "pest_type_name":"Rodent",
     "today":"0",
     "yesterday":"0",
     "this_week":"0",
     "last_week":"0"
  },
  {
     "pest_type_name":"Stray Animals",
     "today":"0",
     "yesterday":"0",
     "this_week":"0",
     "last_week":"0"
  },
  {
     "pest_type_name":"Occasional Invaders \/ Nuisance Pest",
     "today":"0",
     "yesterday":"0",
     "this_week":"0",
     "last_week":"0"
  },
  {
     "pest_type_name":"Stored Product Pest",
     "today":"0",
     "yesterday":"0",
     "this_week":"0",
     "last_week":"0"
  },
  {
     "pest_type_name":"Wood Destroying Organism",
     "today":"0",
     "yesterday":"0",
     "this_week":"0",
     "last_week":"0"
  },
  {
     "pest_type_name":"Ants",
     "today":"1",
     "yesterday":"0",
     "this_week":"1",
     "last_week":"0"
  },
  {
     "pest_type_name":"Mold Feeding Organisms",
     "today":"0",
     "yesterday":"0",
     "this_week":"0",
     "last_week":"0"
  }
]

const criticalFindings : CriticalFinding[] = [
  {
     "reference_no":702,
     "service_order_id":872,
     "Timestamp":"2022-02-19",
     "findings":"DRAINAGES AND SEWERS - Unsanitary condition of internal parts of drains and floor drains.  ",
     "proposed_action":"Floor",
     "area":"Training Room",
     "status":"Open",
     "action_taken":"",
     "actiontaken_by_client":"",
     "person_in_charge":"",
     "risk_assessment":"Critical",
     "client_location_name":"R3hvSVJBeUNRQjJBcVFIbWdVL1QwQTNZdFNlK0QzTlUyVHBxTHZIcXVlZz0="
  },
  {
     "reference_no":538,
     "service_order_id":751,
     "Timestamp":"2021-11-08",
     "findings":"Test3",
     "proposed_action":"Test3",
     "area":"Pantry Area",
     "status":"Open",
     "action_taken":"Test3",
     "actiontaken_by_client":"",
     "person_in_charge":"Ivan",
     "risk_assessment":"Critical",
     "client_location_name":"R3hvSVJBeUNRQjJBcVFIbWdVL1QwQTNZdFNlK0QzTlUyVHBxTHZIcXVlZz0="
  },
  {
     "reference_no":460,
     "service_order_id":717,
     "Timestamp":"2021-10-13",
     "findings":"Food residue",
     "proposed_action":"For cleaning",
     "area":"I.T. Office",
     "status":"Open",
     "action_taken":"Reported. ",
     "actiontaken_by_client":"Cleaned",
     "person_in_charge":"Sanitation",
     "risk_assessment":"Critical",
     "client_location_name":"R3hvSVJBeUNRQjJBcVFIbWdVL1QwQTNZdFNlK0QzTlUyVHBxTHZIcXVlZz0="
  },
  {
     "reference_no":516,
     "service_order_id":732,
     "Timestamp":"2021-10-23",
     "findings":"Food residue",
     "proposed_action":"For cleaning",
     "area":"I.T. Office",
     "status":"Open",
     "action_taken":"Reported",
     "actiontaken_by_client":"",
     "person_in_charge":"Sanitation",
     "risk_assessment":"Critical",
     "client_location_name":"R3hvSVJBeUNRQjJBcVFIbWdVL1QwQTNZdFNlK0QzTlUyVHBxTHZIcXVlZz0="
  },
  {
     "reference_no":524,
     "service_order_id":737,
     "Timestamp":"2021-11-01",
     "findings":"Food residue",
     "proposed_action":"For cleaning",
     "area":"I.T. Office",
     "status":"Open",
     "action_taken":"Reported",
     "actiontaken_by_client":"",
     "person_in_charge":"Sanitation",
     "risk_assessment":"Critical",
     "client_location_name":"R3hvSVJBeUNRQjJBcVFIbWdVL1QwQTNZdFNlK0QzTlUyVHBxTHZIcXVlZz0="
  },
  {
     "reference_no":535,
     "service_order_id":812,
     "Timestamp":"2021-11-05",
     "findings":"Food residue",
     "proposed_action":"For cleaning",
     "area":"I.T. Office",
     "status":"Open",
     "action_taken":"Reported",
     "actiontaken_by_client":"",
     "person_in_charge":"Sanitation",
     "risk_assessment":"Critical",
     "client_location_name":"R3hvSVJBeUNRQjJBcVFIbWdVL1QwQTNZdFNlK0QzTlUyVHBxTHZIcXVlZz0="
  },
  {
     "reference_no":573,
     "service_order_id":835,
     "Timestamp":"2021-11-17",
     "findings":"Findings Dummy Data 2021.11.17",
     "proposed_action":"Action data",
     "area":"I.T. Office",
     "status":"Open",
     "action_taken":"Reported to",
     "actiontaken_by_client":"",
     "person_in_charge":"Client",
     "risk_assessment":"Critical",
     "client_location_name":"R3hvSVJBeUNRQjJBcVFIbWdVL1QwQTNZdFNlK0QzTlUyVHBxTHZIcXVlZz0="
  },
  {
     "reference_no":553,
     "service_order_id":813,
     "Timestamp":"2021-11-19",
     "findings":"Food residue.",
     "proposed_action":"For cleaning",
     "area":"I.T. Office",
     "status":"Open",
     "action_taken":"Reported",
     "actiontaken_by_client":"",
     "person_in_charge":"Sanitation",
     "risk_assessment":"Critical",
     "client_location_name":"R3hvSVJBeUNRQjJBcVFIbWdVL1QwQTNZdFNlK0QzTlUyVHBxTHZIcXVlZz0="
  },
  {
     "reference_no":574,
     "service_order_id":813,
     "Timestamp":"2021-11-19",
     "findings":"Dusty floor",
     "proposed_action":"For cleaning",
     "area":"I.T. Office",
     "status":"Open",
     "action_taken":"Reported to client",
     "actiontaken_by_client":"",
     "person_in_charge":"Sanitation",
     "risk_assessment":"Critical",
     "client_location_name":"R3hvSVJBeUNRQjJBcVFIbWdVL1QwQTNZdFNlK0QzTlUyVHBxTHZIcXVlZz0="
  },
  {
     "reference_no":575,
     "service_order_id":813,
     "Timestamp":"2021-11-19",
     "findings":"Garbage",
     "proposed_action":"For disposal",
     "area":"I.T. Office",
     "status":"Open",
     "action_taken":"Reported to client",
     "actiontaken_by_client":"Cleaned",
     "person_in_charge":"Sanitation",
     "risk_assessment":"Critical",
     "client_location_name":"R3hvSVJBeUNRQjJBcVFIbWdVL1QwQTNZdFNlK0QzTlUyVHBxTHZIcXVlZz0="
  },
  {
     "reference_no":576,
     "service_order_id":836,
     "Timestamp":"2021-11-20",
     "findings":"Food clutters",
     "proposed_action":"Immediate cleaning ",
     "area":"I.T. Office",
     "status":"Open",
     "action_taken":"Discuss to contact person",
     "actiontaken_by_client":"",
     "person_in_charge":"",
     "risk_assessment":"Critical",
     "client_location_name":"R3hvSVJBeUNRQjJBcVFIbWdVL1QwQTNZdFNlK0QzTlUyVHBxTHZIcXVlZz0="
  }
]

// DATA END

// MODULES

const DeviceHealth = (props: { deviceHealth: IPMDeviceHealth[] }) => {
  const rows = deviceHealth.map((element: any) => (
    <tr key={element.device_type_name}>
      <td style={{fontWeight: '500'}}>{element.device_type_name}</td>
      <td style={{color: 'green'}}>{element.good}</td>
      <td style={element.damaged > 0 ? {color: 'red'} : {color: 'unset'}}>{element.damaged}</td>
      <td style={element.for_repair > 0 ? {color: 'red'} : {color: 'unset'}}>{element.for_repair}</td>
      <td style={element.blocked > 0 ? {color: 'red'} : {color: 'unset'}}>{element.blocked}</td>
    </tr>
  ));

  let totalGood = 0;
  let totalCount = 0
  deviceHealth.forEach((element) => {
    totalGood += element.total
    if ((Number(element.blocked) !== 0)) {
      totalCount += Number(element.blocked)
    }

    if ((Number(element.damaged) !== 0)) {
      totalCount += Number(element.damaged)
    }

    if ((Number(element.for_repair) !== 0)) {
      totalCount += Number(element.for_repair)
    }
  })

  const percentage = (100 - ((100 * totalCount) / totalGood));

  return (
    <Paper shadow="md" p="md">
      <Title order={2}>IPM Device Health</Title>
      <Text mb='md'>Analysis: <span style={{color: 'green'}}>{percentage.toFixed(0)}%</span> of the devices are in good working condition</Text>
      <ScrollArea>
        <Table>
        <thead>
          <tr>
            <th>IPM Devices</th>
            <th>Good</th>
            <th>Damaged</th>
            <th>Missing</th>
            <th>Inaccessible</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      </ScrollArea>
    </Paper>
  )
}

const PestCountMetrics = (props: { pestCountMetric: PestCountMetric[] }) => {

  const percentChange = (today: string, yesterday: string) => {
    const todayValue = Number(today);
    const yesterdayValue = Number(yesterday);
    let percent;
    if(todayValue !== 0) {
      if(yesterdayValue !== 0) {
          percent = (todayValue - yesterdayValue) / yesterdayValue * 100;
      } else {
          percent = todayValue * 100;
      }
  } else {
      percent = - yesterdayValue * 100;            
  }
  return Math.floor(percent);
}


  const rows = pestCountMetric.map((element: any) => (
    <tr key={element.pest_type_name}>
      <td>{element.pest_type_name}</td>
      {(Number(element.today) !== 0) ?
        (<td style={{ color: 'red' }}>{percentChange(element.today, element.yesterday)}%, {((element.today - element.yesterday)>=0) ? `${element.today}` : `-${element.today}`} </td>)
        :
        (<td style={{ color: 'green' }}>{percentChange(element.today, element.yesterday)}%, {((element.today - element.yesterday)>=0) ? `${element.today}` : `-${element.today}`}</td>)
      }
  
      {(Number(element.this_week) !== 0) ?
        (<td style={{ color: 'red' }}>{percentChange(element.this_week, element.last_week)}%, {((element.this_week - element.last_week)>=0) ? `${element.this_week}` : `-${element.this_week}`} </td>)
        :
        (<td style={{ color: 'green' }}>{percentChange(element.this_week, element.last_week)}%, {((element.this_week - element.last_week)>=0) ? `${element.this_week}` : `-${element.this_week}`}</td>)
      }
      
    </tr>
  ));
  


  return (
    <Paper shadow="md" p="md">
      <Title order={2}>Pest Count Metrics</Title>
        <ScrollArea>
        <Table>
        <thead>
          <tr>
            <th></th>
            <th>Today</th>
            <th>Week</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
        </ScrollArea>
    </Paper>
  )
}

const CriticalFindings = (props: { criticalFindings: CriticalFinding[] }) => {
  return (
    <Paper shadow="md" p="md">
      <Title order={2} pb='md'>Critical Findings</Title>
      <ScrollArea style={{ height: 250 }} offsetScrollbars>
        {criticalFindings.map((finding) => (
          <div key={finding.reference_no} style={{ margin: '0 0 10px 0', padding: '0 0 20px 0' }}>
          <Group align='top'>
            <Avatar alt="Critical Finding" radius="xl" >
              <ExclamationMark />
            </Avatar>
            <div style={{ flexGrow: '1' }}>
              <Text weight={500}>{finding.findings}</Text>
              <Text size="xs" color="dimmed">
                  SO: {finding.service_order_id} • {(new Date(finding.Timestamp)).toLocaleDateString('en-us', {weekday: 'short', year: 'numeric', day: '2-digit', month: 'short'})} • Ref: {finding.reference_no}
                </Text>
                <Divider my="xs" label="Proposed Action" />
                <Text size="sm">
                  {finding.proposed_action}
                </Text>
            </div>
          </Group>
        </div>
        ))}
      </ScrollArea>
    </Paper>
  )
}

// MODULES END

const DashboardContents = () => {
  const [data, setData] = useState<DashboardData>({ 'breachCount': '', 'findingsCount': '', 'acknowledgeCount': '', 'nextVisit': '', 'dailyPestData': { 'labels': [''], 'datasets': [{ 'label': '', 'data': [], 'backgroundColor': '', 'borderColor': '' }] }, 'findingsData': { 'labels': [], 'datasets': [] } })
  const [isLoading, setIsLoading] = useState(true);
  const load = () => [
    getData().then(payload => {
      setData(payload);
      setIsLoading(false);
    }).catch(function (error) {
      console.log(error);
    })
  ]

  useEffect(() => {
    load();
  }, [])
  return (
      // <ScrollArea style={{height: 'auto'}}>
    <>
      <LoadingOverlay overlayOpacity={1} style={{ position: 'fixed'}} visible={isLoading} />
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
      <SimpleGrid cols={2} breakpoints={[
        { minWidth: 'xs', cols: 1 },
        { minWidth: 'sm', cols: 1 },
        { minWidth: 'md', cols: 2 },
        { minWidth: 1200, cols: 2 }
      ]}>
        <div>
          <Paper shadow="md" p="md">
            <DataTable chartType={"line"} options={pestOptions} data={data.dailyPestData}  />
          </Paper>
        </div>
        <div>
          <Paper shadow="md" p="md">
            <Center>
              <DataTable chartType={"pie"} data={data.findingsData} options={findingsOptions} />
            </Center>
          </Paper>
        </div>
        <div>
          <DeviceHealth deviceHealth={deviceHealth}/>
        </div>
        <div>
          <PestCountMetrics pestCountMetric={pestCountMetric} />
        </div>
        <div>
          <CriticalFindings criticalFindings={criticalFindings} />
        </div>
      </SimpleGrid> 
      </>
      // </ScrollArea>
  )
}

export default DashboardContents