import React, { useEffect } from "react";

import { Title, Text, Paper, Divider } from "@mantine/core";
import { serviceOrders } from "./dummyData";
import TableRender from "../../modules/admin/TableRender";

const ServiceManagement = () => {
  return (
    <>
      <Paper shadow="md" p="sm" my="md" sx={{ height: "auto" }}>
        <Text size="xl">Service Order</Text>
        <Divider my="sm" />
        <TableRender
          data={serviceOrders}
          description="Mock data for now"
          idColumn={"ref_no"}
          ignoreColumn={["actionbtn", "id"]}
          columnHeadings={[
            "Ref No",
            "Service Type",
            "Location",
            "Staff",
            "Date",
            "Time",
            "End Time",
            "Status",
          ]}
          filterableHeadings={["location", "service_type"]}
        />
      </Paper>
    </>
  );
};

export default ServiceManagement;
