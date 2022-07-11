import React, { useEffect } from "react";
import { Paper } from "@mantine/core";
import UserAccessTable from "../../../modules/admin/UserManagement/UserAccessTable";
import { userAccess } from "../dummyData";
import { useLocation } from "react-router-dom";

const UserAccess = () => {
  const location = useLocation();
  const { data }: any = location.state;
  const nameProps = data.name;
  const dummyData = {
    name: nameProps,
    roles: [
      { roleName: "Sterix Supervisor", id: "1" },
      { roleName: "Client Company Administrator", id: "2" },
      { roleName: "Sterix Administrator", id: "3" },
    ],
  };

  useEffect(() => {
    console.log(data);

    return () => {
      null;
    };
  }, []);

  return (
    <>
      <Paper shadow="md" p="sm" my="md" sx={{ height: "auto" }}>
        <UserAccessTable
          data={dummyData}
          idColumn={"userID"}
          ignoreColumn={["roles", "id"]}
          columnHeadings={["Roles", "Action"]}
        />
      </Paper>
    </>
  );
};

export default UserAccess;
