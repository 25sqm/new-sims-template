import React, { useEffect, useState } from "react";

import {
  Title,
  Text,
  Paper,
  Divider,
  Tabs,
  Group,
  NativeSelect,
  TextInput,
  Button,
  LoadingOverlay,
  Container,
  Image,
} from "@mantine/core";
import {
  areaMonitoring,
  areaInformation,
  areaThreshold,
  criticalPests,
} from "../../dummyData";
import TableRender from "../../../../modules/admin/TableRender";

const PestIncidenceMap = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Paper shadow="md" p="sm" my="md" sx={{ height: "auto" }}>
        <Group align={"flex-end"}>
          <TextInput placeholder="Enter SO#" label="Service Order" />
          <NativeSelect
            data={[
              "All",
              "Sterix Incorporated - Unit 701",
              "Sterix Incorporated - Unit 1201",
              "Sterix Incorporated - Unit 808",
            ]}
            label="Site"
            placeholder="All"
          />
          <NativeSelect data={["All"]} label="Area" placeholder="All" />
          <NativeSelect
            data={["All", "Asian Roach", "Asian Cockroach", "Asian House Rat"]}
            label="Pest"
            placeholder="All"
          />
          <Button onClick={() => setIsLoading((isLoading) => !isLoading)}>
            View Incident
          </Button>
        </Group>
        <div
          style={{
            width: "100%",
            position: "relative",
            margin: "10px 0px 10px 0px",
          }}
        >
          <LoadingOverlay visible={isLoading} />
          <Container
            p="lg"
            sx={(theme) => ({
              backgroundColor: `${
                theme.colorScheme === "dark"
                  ? theme.colors.dark[6]
                  : theme.colors.gray[0]
              }`,
              height: "450px",
              "&:hover": {
                backgroundColor: `${
                  theme.colorScheme === "dark"
                    ? theme.colors.dark[5]
                    : theme.colors.gray[1]
                }`,
                cursor: "pointer",
              },
            })}
            fluid
          >
            {/* Map will be here... */}
            <Image
              width={"100%"}
              height={450}
              alt="With default placeholder"
              withPlaceholder
            />
          </Container>
          <TableRender
            data={[
              { id: 1, title: "Pest Found (Device)", value: 0 },
              { id: 2, title: "Pest Found (Area)", value: 0 },
              { id: 3, title: "Total Pest Found", value: 0 },
            ]}
            idColumn={"id"}
            ignoreColumn={["id"]}
            columnHeadings={["Device Code", "Pest Found"]}
          />
        </div>
      </Paper>
    </>
  );
};

export default PestIncidenceMap;
