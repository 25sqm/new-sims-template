import React, { useEffect, useState } from "react";
import { Paper } from "@mantine/core";
import UserAccessTable from "../../../modules/admin/UserManagement/UserAccessTable";
import { userAccess } from "../dummyData";
import { useLocation } from "react-router-dom";
import { getUserAccess } from "../../../api/user";

const UserAccess = () => {
  const [userAccessData, setUserAccessData] = useState([]);
  const location = useLocation();
  const { data }: any = location.state;
  console.log(data);
  const nameProps = data.name;
  const dummyData = {
    name: nameProps,
    roles: [
      { roleName: "Sterix Supervisor", id: "1" },
      { roleName: "Client Company Administrator", id: "2" },
      { roleName: "Sterix Administrator", id: "3" },
    ],
  };

  const fetchUserAccess = async (id: number) => {
    const data = await getUserAccess(id);
    setUserAccessData(data.data);
  };

  useEffect(() => {
    fetchUserAccess(data.ID);
    console.log(userAccessData);
  }, []);

  return (
    <>
      <Paper shadow="md" p="sm" my="md" sx={{ height: "auto" }}>
        <UserAccessTable
          name={data.name}
          data={userAccessData}
          idColumn={"role_id"}
          ignoreColumn={["role_id", "actionbtn", "user_access_ID"]}
          columnHeadings={["Roles", "Action"]}
        />
      </Paper>
    </>
  );
};

export default UserAccess;
