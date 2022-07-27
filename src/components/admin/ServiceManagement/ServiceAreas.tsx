import React, { useEffect, useState } from "react";
import { Card, Paper, SimpleGrid, Text } from "@mantine/core";
import UserAccessTable from "../../../modules/admin/UserManagement/UserAccessTable";
import { userAccess } from "../dummyData";
import { useLocation } from "react-router-dom";
import { getUserAccess } from "../../../api/user";
import ServiceOrderTasksTable from "../../../modules/admin/ServiceManagement/ServiceOrderTasksTable";
import ServiceAreasTable from "../../../modules/admin/ServiceManagement/ServiceAreasTable";
import { getServiceAreas } from "../../../api/service-orders";
import { RowInsertBottom } from "tabler-icons-react";

const ServiceAreas = () => {
  const [serviceAreas, setServiceAreas] = useState([]);
  const location = useLocation();
  const { data }: any = location.state;

  const fetchServiceAreas = async (id: number) => {
    const data = await getServiceAreas(id);
    setServiceAreas(data.data);
  };

  useEffect(() => {
    fetchServiceAreas(data.ref_no);
  }, []);

  return (
    <>
      <Paper shadow="md" p="sm" my="md" sx={{ height: "auto" }}>
        <Card shadow="sm" p="lg" radius="md" mb="md" withBorder>
          <SimpleGrid
            cols={2}
            breakpoints={[
              { minWidth: "xs", cols: 1 },
              { minWidth: "sm", cols: 1 },
              { minWidth: "md", cols: 1 },
              { minWidth: 1200, cols: 2 },
            ]}
          >
            <div>
              <Text>Service Order No: {data.ref_no}</Text>
              <Text>Service Type: {data.service_type}</Text>
              <Text>Location: {data.location}</Text>
            </div>
            <div>
              <Text>Date: {data.date}</Text>
              <Text>Assigned Staff: {data.staff}</Text>
            </div>
          </SimpleGrid>
        </Card>
        <ServiceAreasTable
          data={serviceAreas}
          idColumn={"order_of_inspection"}
          ignoreColumn={["actionbtn"]}
          columnHeadings={["Area", "Order", "Action"]}
        />
      </Paper>
    </>
  );
};

export default ServiceAreas;
