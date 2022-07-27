import React, { useEffect, useState } from "react";

import { Text, Paper, Divider, Tabs, Button } from "@mantine/core";
import UserMgtTable from "../../../modules/admin/UserManagement/UserMgtTable";
import UserRolesTable from "../../../modules/admin/UserManagement/UserRoles";
import { getUserRoles, getUsersInfo } from "../../../api/user";
const UserManagement = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [userRoles, setUserRoles] = useState([]);

  const fetchUsersData = async () => {
    const data = await getUsersInfo();
    setUserInfo(data.data);
  };

  const fetchUserRoles = async () => {
    const data = await getUserRoles();
    setUserRoles(data.data);
  };

  useEffect(() => {
    fetchUsersData();
    fetchUserRoles();
  }, []);

  return (
    <>
      <Paper shadow="md" p="sm" my="md" sx={{ height: "auto" }}>
        <Tabs>
          <Tabs.Tab label="User Management">
            <UserMgtTable
              fetchUsersData={fetchUsersData}
              data={userInfo}
              filterableHeadings={["Organization"]}
              ignoreColumn={[
                "ID",
                "actionbtn",
                "permanent_add",
                "birthday",
                "landline_no",
                "sex",
                "org_id",
              ]}
              columnHeadings={[
                "",
                "Name",
                "Email",
                "Username",
                "Mobile Number",
                "Organization",
                "Actions",
              ]}
              idColumn={"username"}
            />
          </Tabs.Tab>
          <Tabs.Tab label="User Roles">
            <UserRolesTable
              data={userRoles}
              idColumn={"ID"}
              ignoreColumn={["Permissions", "actionbtn", "ID"]}
              columnHeadings={[
                "",
                "Role Name",
                "Description",
                "Type",
                "Action",
              ]}
            />
          </Tabs.Tab>
        </Tabs>
      </Paper>
    </>
  );
};

export default UserManagement;
