import React from "react";
import { ArrowUpCircle, DeviceMobile } from "tabler-icons-react";
import {
  Paper,
  Text,
  Grid,
  Group,
  ThemeIcon,
  Button,
  Divider,
} from "@mantine/core";
import { DeviceInspectionTable } from "../modules/DeviceInspectionTable";

const data = [
  {
    serviceOrder: 101,
    dateTime: "2022-01-27 06:35:23",
    area: "Pantry Area",
    deviceCode: "MT",
    condition: "Ready",
    activity: "0",
    image: "",
  },
  {
    serviceOrder: 102,
    dateTime: "2022-01-27 06:35:23",
    area: "Pantry Area",
    deviceCode: "MT",
    condition: "Ready",
    activity: "0",
    image: "",
  },
  {
    serviceOrder: 103,
    dateTime: "2022-01-27 06:35:23",
    area: "Pantry Area",
    deviceCode: "MT",
    condition: "Ready",
    activity: "0",
    image:
      "https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80",
  },
];
const tableHeadings = [
  "Service Order",
  "Area",
  "Device Code",
  "Condition",
  "Activity",
  "Image",
  "Timestamp",
];

const RealtimeMonitoring = () => {
  return (
    <>
      <Paper shadow="md" p="sm" my="md">
        <Text size="xl">Realtime Monitoring</Text>
        <Grid py="md">
          <Grid.Col md={6} lg={9}>
            <Paper p="md" withBorder>
              <Group>
                <ThemeIcon color="red" variant="light" radius="xs" size={36}>
                  <DeviceMobile size={40} />
                </ThemeIcon>
                <Group grow direction="column" spacing={0}>
                  <Text size="xl" weight={500}>
                    Device Inspection
                  </Text>
                </Group>
              </Group>
              <Divider my="sm" />
              <DeviceInspectionTable
                listData={data}
                tableHeadings={tableHeadings}
              />
            </Paper>
          </Grid.Col>
          <Grid.Col md={6} lg={3}>
            <Paper p="md" withBorder>
              <Group>
                <ThemeIcon color="yellow" variant="light" radius="xs" size={36}>
                  <ArrowUpCircle size={40} />
                </ThemeIcon>
                <Group grow direction="column" spacing={0}>
                  <Text size="lg" weight={500}>
                    Ongoing Sterix Activity
                  </Text>
                </Group>
                <Text>No Activity Today.</Text>
                <Group direction="row">
                  <Button>View Report</Button>
                  <Button>Feedback</Button>
                </Group>
              </Group>
            </Paper>
          </Grid.Col>
        </Grid>
      </Paper>
    </>
  );
};

export default RealtimeMonitoring;
