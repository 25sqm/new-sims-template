import React, { useEffect, useState } from "react";
import { Card, Paper, SimpleGrid, Text } from "@mantine/core";
import UserAccessTable from "../../../modules/admin/UserManagement/UserAccessTable";
import { userAccess } from "../dummyData";
import { useLocation } from "react-router-dom";
import { getUserAccess } from "../../../api/user";
import ServiceOrderTasksTable from "../../../modules/admin/ServiceManagement/ServiceOrderTasksTable";
import { getServiceTasks } from "../../../api/service-orders";
import { RowInsertBottom } from "tabler-icons-react";

const ServiceTasks = () => {
  const [serviceTasks, setServiceTasks] = useState([]);
  const location = useLocation();
  const { data }: any = location.state;
  console.log(data);
  const nameProps = data.name;

  const fetchServiceTasks = async (id: number) => {
    const data = await getServiceTasks(id);
    setServiceTasks(data.data);
  };

  useEffect(() => {
    fetchServiceTasks(data.ref_no);
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
        <ServiceOrderTasksTable
          data={serviceTasks}
          idColumn={"ID"}
          ignoreColumn={["ID", "actionbtn", "user_access_ID"]}
          columnHeadings={[
            "Task",
            "Target Time",
            "Status",
            "Actual Time",
            "Finished?",
            "Area",
            "Action",
          ]}
        />
      </Paper>
    </>
  );
};

export default ServiceTasks;
