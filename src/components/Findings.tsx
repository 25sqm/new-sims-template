import React from "react";

import {
  ChevronRight,
  AlertTriangle,
  ArrowUpCircle,
  ArrowDownCircle,
  FileDescription,
} from "tabler-icons-react";
import { Paper, Text, Grid, Group, ThemeIcon, ActionIcon } from "@mantine/core";
import FindingsTabView from "../modules/FindingsTabView";

const dummyData = [
  {
    label: "Critical Findings",
    findings: [
      {
        area: "Training Room",
        areaFindings: [
          {
            serviceOrder: "1035",
            refNumber: "693",
            findings:
              "DOORS, WINDOWS, LOUVERS, AIR AND PLASTIC CURTAIN - Chipped off paints in door",
            proposed: "Repair chipped off paint",
            actionTaken: "",
            personInCharge: "Engineering",
            date: "2022-02-26",
          },
        ],
      },
      {
        area: "Pantry Area",
        areaFindings: [
          {
            serviceOrder: "1035",
            refNumber: "693",
            findings:
              "DOORS, WINDOWS, LOUVERS, AIR AND PLASTIC CURTAIN - Chipped off paints in door",
            proposed: "Repair chipped off paint",
            actionTaken: "",
            personInCharge: "Engineering",
            date: "2022-02-26",
          },
        ],
      },
      {
        area: "Lobby",
        areaFindings: [
          {
            serviceOrder: "1035",
            refNumber: "693",
            findings:
              "DOORS, WINDOWS, LOUVERS, AIR AND PLASTIC CURTAIN - Chipped off paints in door",
            proposed: "Repair chipped off paint",
            actionTaken: "",
            personInCharge: "Engineering",
            date: "2022-02-26",
          },
          {
            serviceOrder: "1035",
            refNumber: "693",
            findings:
              "DOORS, WINDOWS, LOUVERS, AIR AND PLASTIC CURTAIN - Chipped off paints in door",
            proposed: "Repair chipped off paint",
            actionTaken: "",
            personInCharge: "Engineering",
            date: "2022-02-26",
          },
          {
            serviceOrder: "1035",
            refNumber: "693",
            findings:
              "DOORS, WINDOWS, LOUVERS, AIR AND PLASTIC CURTAIN - Chipped off paints in door",
            proposed: "Repair chipped off paint",
            actionTaken: "",
            personInCharge: "Engineering",
            date: "2022-02-26",
          },
          {
            serviceOrder: "1035",
            refNumber: "693",
            findings:
              "DOORS, WINDOWS, LOUVERS, AIR AND PLASTIC CURTAIN - Chipped off paints in door",
            proposed: "Repair chipped off paint",
            actionTaken: "",
            personInCharge: "Engineering",
            date: "2022-02-26",
          },
          {
            serviceOrder: "1035",
            refNumber: "693",
            findings:
              "DOORS, WINDOWS, LOUVERS, AIR AND PLASTIC CURTAIN - Chipped off paints in door",
            proposed: "Repair chipped off paint",
            actionTaken: "",
            personInCharge: "Engineering",
            date: "2022-02-26",
          },
          {
            serviceOrder: "1035",
            refNumber: "693",
            findings:
              "DOORS, WINDOWS, LOUVERS, AIR AND PLASTIC CURTAIN - Chipped off paints in door",
            proposed: "Repair chipped off paint",
            actionTaken: "",
            personInCharge: "Engineering",
            date: "2022-02-26",
          },
          {
            serviceOrder: "1035",
            refNumber: "693",
            findings:
              "DOORS, WINDOWS, LOUVERS, AIR AND PLASTIC CURTAIN - Chipped off paints in door",
            proposed: "Repair chipped off paint",
            actionTaken: "",
            personInCharge: "Engineering",
            date: "2022-02-26",
          },
          {
            serviceOrder: "1035",
            refNumber: "693",
            findings:
              "DOORS, WINDOWS, LOUVERS, AIR AND PLASTIC CURTAIN - Chipped off paints in door",
            proposed: "Repair chipped off paint",
            actionTaken: "",
            personInCharge: "Engineering",
            date: "2022-02-26",
          },
          {
            serviceOrder: "1035",
            refNumber: "693",
            findings:
              "DOORS, WINDOWS, LOUVERS, AIR AND PLASTIC CURTAIN - Chipped off paints in door",
            proposed: "Repair chipped off paint",
            actionTaken: "",
            personInCharge: "Engineering",
            date: "2022-02-26",
          },
          {
            serviceOrder: "1035",
            refNumber: "693",
            findings:
              "DOORS, WINDOWS, LOUVERS, AIR AND PLASTIC CURTAIN - Chipped off paints in door",
            proposed: "Repair chipped off paint",
            actionTaken: "",
            personInCharge: "Engineering",
            date: "2022-02-26",
          },
        ],
      },
    ],
  },
  {
    label: "High Priority",
    findings: [
      {
        area: "Training Room",
        areaFindings: [
          {
            serviceOrder: "1035",
            refNumber: "693",
            findings:
              "DOORS, WINDOWS, LOUVERS, AIR AND PLASTIC CURTAIN - Chipped off paints in door",
            proposed: "Repair chipped off paint",
            actionTaken: "",
            personInCharge: "Engineering",
            date: "2022-02-26",
          },
        ],
      },
      {
        area: "Pantry Area",
        areaFindings: [
          {
            serviceOrder: "1035",
            refNumber: "693",
            findings:
              "DOORS, WINDOWS, LOUVERS, AIR AND PLASTIC CURTAIN - Chipped off paints in door",
            proposed: "Repair chipped off paint",
            actionTaken: "",
            personInCharge: "Engineering",
            date: "2022-02-26",
          },
        ],
      },
      {
        area: "Lobby",
        areaFindings: [
          {
            serviceOrder: "1035",
            refNumber: "693",
            findings:
              "DOORS, WINDOWS, LOUVERS, AIR AND PLASTIC CURTAIN - Chipped off paints in door",
            proposed: "Repair chipped off paint",
            actionTaken: "",
            personInCharge: "Engineering",
            date: "2022-02-26",
          },
          {
            serviceOrder: "1035",
            refNumber: "693",
            findings:
              "DOORS, WINDOWS, LOUVERS, AIR AND PLASTIC CURTAIN - Chipped off paints in door",
            proposed: "Repair chipped off paint",
            actionTaken: "",
            personInCharge: "Engineering",
            date: "2022-02-26",
          },
        ],
      },
    ],
  },
  {
    label: "Low Priority",
    findings: [
      {
        area: "Training Room",
        areaFindings: [
          {
            serviceOrder: "1035",
            refNumber: "693",
            findings:
              "DOORS, WINDOWS, LOUVERS, AIR AND PLASTIC CURTAIN - Chipped off paints in door",
            proposed: "Repair chipped off paint",
            actionTaken: "",
            personInCharge: "Engineering",
            date: "2022-02-26",
          },
        ],
      },
      {
        area: "Pantry Area",
        areaFindings: [
          {
            serviceOrder: "1035",
            refNumber: "693",
            findings:
              "DOORS, WINDOWS, LOUVERS, AIR AND PLASTIC CURTAIN - Chipped off paints in door",
            proposed: "Repair chipped off paint",
            actionTaken: "",
            personInCharge: "Engineering",
            date: "2022-02-26",
          },
        ],
      },
      {
        area: "Lobby",
        areaFindings: [
          {
            serviceOrder: "1035",
            refNumber: "693",
            findings:
              "DOORS, WINDOWS, LOUVERS, AIR AND PLASTIC CURTAIN - Chipped off paints in door",
            proposed: "Repair chipped off paint",
            actionTaken: "",
            personInCharge: "Engineering",
            date: "2022-02-26",
          },
          {
            serviceOrder: "1035",
            refNumber: "693",
            findings:
              "DOORS, WINDOWS, LOUVERS, AIR AND PLASTIC CURTAIN - Chipped off paints in door",
            proposed: "Repair chipped off paint",
            actionTaken: "",
            personInCharge: "Engineering",
            date: "2022-02-26",
          },
        ],
      },
    ],
  },
  {
    label: "Open Findings",
    findings: [
      {
        area: "Training Room",
        areaFindings: [
          {
            serviceOrder: "1035",
            refNumber: "693",
            findings:
              "DOORS, WINDOWS, LOUVERS, AIR AND PLASTIC CURTAIN - Chipped off paints in door",
            proposed: "Repair chipped off paint",
            actionTaken: "",
            personInCharge: "Engineering",
            date: "2022-02-26",
          },
        ],
      },
      {
        area: "Pantry Area",
        areaFindings: [
          {
            serviceOrder: "1035",
            refNumber: "693",
            findings:
              "DOORS, WINDOWS, LOUVERS, AIR AND PLASTIC CURTAIN - Chipped off paints in door",
            proposed: "Repair chipped off paint",
            actionTaken: "",
            personInCharge: "Engineering",
            date: "2022-02-26",
          },
        ],
      },
      {
        area: "Lobby",
        areaFindings: [
          {
            serviceOrder: "1035",
            refNumber: "693",
            findings:
              "DOORS, WINDOWS, LOUVERS, AIR AND PLASTIC CURTAIN - Chipped off paints in door",
            proposed: "Repair chipped off paint",
            actionTaken: "",
            personInCharge: "Engineering",
            date: "2022-02-26",
          },
          {
            serviceOrder: "1035",
            refNumber: "693",
            findings:
              "DOORS, WINDOWS, LOUVERS, AIR AND PLASTIC CURTAIN - Chipped off paints in door",
            proposed: "Repair chipped off paint",
            actionTaken: "",
            personInCharge: "Engineering",
            date: "2022-02-26",
          },
        ],
      },
    ],
  },
  {
    label: "Closed Findings",
    findings: [
      {
        area: "Training Room",
        areaFindings: [
          {
            serviceOrder: "1035",
            refNumber: "693",
            findings:
              "DOORS, WINDOWS, LOUVERS, AIR AND PLASTIC CURTAIN - Chipped off paints in door",
            proposed: "Repair chipped off paint",
            actionTaken: "",
            personInCharge: "Engineering",
            date: "2022-02-26",
          },
        ],
      },
      {
        area: "Pantry Area",
        areaFindings: [
          {
            serviceOrder: "1035",
            refNumber: "693",
            findings:
              "DOORS, WINDOWS, LOUVERS, AIR AND PLASTIC CURTAIN - Chipped off paints in door",
            proposed: "Repair chipped off paint",
            actionTaken: "",
            personInCharge: "Engineering",
            date: "2022-02-26",
          },
        ],
      },
      {
        area: "Lobby",
        areaFindings: [
          {
            serviceOrder: "1035",
            refNumber: "693",
            findings:
              "DOORS, WINDOWS, LOUVERS, AIR AND PLASTIC CURTAIN - Chipped off paints in door",
            proposed: "Repair chipped off paint",
            actionTaken: "",
            personInCharge: "Engineering",
            date: "2022-02-26",
          },
          {
            serviceOrder: "1035",
            refNumber: "693",
            findings:
              "DOORS, WINDOWS, LOUVERS, AIR AND PLASTIC CURTAIN - Chipped off paints in door",
            proposed: "Repair chipped off paint",
            actionTaken: "",
            personInCharge: "Engineering",
            date: "2022-02-26",
          },
        ],
      },
    ],
  },
];

const Findings = () => {
  return (
    <>
      <Paper shadow="md" p="sm" my="md">
        <Text size="xl">Findings</Text>
        <Grid py="md">
          <Grid.Col md={6} lg={3}>
            <Paper shadow="md" p="md" withBorder>
              <Group>
                <ThemeIcon color="red" variant="light" radius="xs" size={40}>
                  <AlertTriangle size={20} />
                </ThemeIcon>
                <Group grow direction="column" spacing={0}>
                  <h5 style={{ marginTop: 0, marginBottom: 0 }}>0</h5>
                  <Text
                    color="dimmed"
                    size="sm"
                    sx={{ marginTop: 0, marginBottom: 5 }}
                  >
                    Critical Priority Findings
                  </Text>
                </Group>
                <ActionIcon sx={{ marginLeft: "auto" }} size="lg" radius="xs">
                  <ChevronRight />
                </ActionIcon>
              </Group>
            </Paper>
          </Grid.Col>
          <Grid.Col md={6} lg={3}>
            <Paper shadow="md" p="md" withBorder>
              <Group>
                <ThemeIcon color="yellow" variant="light" radius="xs" size={40}>
                  <ArrowUpCircle size={20} />
                </ThemeIcon>
                <Group grow direction="column" spacing={0}>
                  <h5 style={{ marginTop: 0, marginBottom: 0 }}>3</h5>
                  <Text
                    color="dimmed"
                    size="sm"
                    sx={{ marginTop: 0, marginBottom: 5 }}
                  >
                    High Priority Findings
                  </Text>
                </Group>
                <ActionIcon sx={{ marginLeft: "auto" }} size="lg" radius="xs">
                  <ChevronRight />
                </ActionIcon>
              </Group>
            </Paper>
          </Grid.Col>
          <Grid.Col md={6} lg={3}>
            <Paper shadow="md" p="md" withBorder>
              <Group>
                <ThemeIcon variant="light" radius="xs" size={40}>
                  <ArrowDownCircle size={20} />
                </ThemeIcon>
                <Group grow direction="column" spacing={0}>
                  <h5 style={{ marginTop: 0, marginBottom: 0 }}>5</h5>
                  <Text
                    color="dimmed"
                    size="sm"
                    sx={{ marginTop: 0, marginBottom: 5 }}
                  >
                    Low Priority Findings
                  </Text>
                </Group>
                <ActionIcon sx={{ marginLeft: "auto" }} size="lg" radius="xs">
                  <ChevronRight />
                </ActionIcon>
              </Group>
            </Paper>
          </Grid.Col>
          <Grid.Col md={6} lg={3}>
            <Paper shadow="md" p="md" withBorder>
              <Group>
                <ThemeIcon color="gray" variant="light" radius="xs" size={40}>
                  <FileDescription size={20} />
                </ThemeIcon>
                <Group grow direction="column" spacing={0}>
                  <h5 style={{ marginTop: 0, marginBottom: 0 }}>1</h5>
                  <Text
                    color="dimmed"
                    size="sm"
                    sx={{ marginTop: 0, marginBottom: 5 }}
                  >
                    Open Findings
                  </Text>
                </Group>
                <ActionIcon sx={{ marginLeft: "auto" }} size="lg" radius="xs">
                  <ChevronRight />
                </ActionIcon>
              </Group>
            </Paper>
          </Grid.Col>
        </Grid>
        <FindingsTabView data={dummyData} />
      </Paper>
    </>
  );
};

export default Findings;
