import React, { useEffect, useState } from "react";

import { Text, Paper, Divider, Tabs, Button, Title } from "@mantine/core";
import UserMgtTable from "../../../../modules/admin/UserManagement/UserMgtTable";
import { getUsersInfo } from "../../../../api/user";
const UserInformation = () => {
  const [userInfo, setUserInfo] = useState([]);

  const fetchUsersData = async () => {
    const data = await getUsersInfo();
    setUserInfo(data.data);
  };

  useEffect(() => {
    fetchUsersData();
  }, []);

  return (
    <>
      <Title
        sx={(theme) => ({
          color: `${
            theme.colorScheme === "dark"
              ? theme.colors.gray[2]
              : theme.colors.dark[3]
          }`,
        })}
        mt={15}
        order={1}
      >
        User Information
      </Title>
      <Paper shadow="md" p="sm" my="md" sx={{ height: "auto" }}>
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
      </Paper>
    </>
  );
};

export default UserInformation;
