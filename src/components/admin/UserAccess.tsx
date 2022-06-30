import React from "react";
import { Paper } from "@mantine/core";
import UserAccessTable from "../../modules/admin/UserAccessTable";
import { userSites } from "./dummyData";

const UserAccess = () => {
  return (
    <>
      <Paper shadow="md" p="sm" my="md" sx={{ height: "auto" }}>
        <UserAccessTable
          data={userSites}
          idColumn={"userID"}
          ignoreColumn={["roles", "id"]}
          columnHeadings={["Sites", "Action"]}
        />
      </Paper>
    </>
  );
};

export default UserAccess;
