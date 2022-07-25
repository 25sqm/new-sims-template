import React, { useEffect, useState } from "react";

import { Text, Paper, Divider } from "@mantine/core";
import { serviceOrders } from "../dummyData";
import ServiceOrdersTable from "../../../modules/admin/ServiceManagement/ServiceOrdersTable";
import { getServiceOrders } from "../../../api/service-orders";

const ServiceManagement = () => {
  const [serviceOrders, setServiceOrders] = useState<any>([]);

  const fetchServiceOrders = async () => {
    const response = await getServiceOrders();
    setServiceOrders(response.data);
  };

  useEffect(() => {
    fetchServiceOrders();
  }, []);
  return (
    <>
      <Paper shadow="md" p="sm" my="md" sx={{ height: "auto" }}>
        <Text size="xl">Service Order</Text>
        <Divider my="sm" />
        <ServiceOrdersTable
          data={serviceOrders}
          idColumn={"ref_no"}
          ignoreColumn={["actionbtn", "id"]}
          columnHeadings={[
            "",
            "Ref No",
            "Service Type",
            "Location",
            "Staff",
            "Date",
            "Time",
            "End Time",
            "Status",
            "Action",
          ]}
          filterableHeadings={["location", "service_type"]}
        />
      </Paper>
    </>
  );
};

export default ServiceManagement;
