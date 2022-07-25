import React, { useEffect, useState } from "react";
import { Button, Paper } from "@mantine/core";
import UserAccessTable from "../../../modules/admin/UserManagement/UserAccessTable";
import { userAccess } from "../dummyData";
import { useLocation } from "react-router-dom";
import UserPermissionsTable from "../../../modules/admin/UserManagement/UserPermissionsTable";
import { getUserPermissions } from "../../../api/user";

const UserPermissions = () => {
  const [userPermissions, setUserPermissions] = useState([]);
  const location = useLocation();
  const { data }: any = location.state;
  console.log("data", data);
  const nameProps = data.name;

  const fetchRolePermissions = async (id: number) => {
    const data = await getUserPermissions(id);
    setUserPermissions(data.data);
  };

  useEffect(() => {
    fetchRolePermissions(data.ID);
  }, []);

  return (
    <>
      <Paper shadow="md" p="sm" my="md" sx={{ height: "auto" }}>
        <UserPermissionsTable
          role={data.Name}
          data={userPermissions}
          idColumn={"ID"}
          ignoreColumn={["actionbtn", "ID", "permission_id", "page_id"]}
          columnHeadings={["Page", "Permission", "Action"]}
        />
      </Paper>
    </>
  );
};

export default UserPermissions;
