import React, { useEffect, useState } from "react";
import { Paper } from "@mantine/core";
import UserSitesTable from "../../../modules/admin/UserManagement/UserSitesTable";
import { userAccess } from "../dummyData";
import { useLocation } from "react-router-dom";
import { getUserSites } from "../../../api/user";

const UserSites = () => {
  const [userSites, setUserSites] = useState([]);
  const location = useLocation();
  const { data }: any = location.state;
  const nameProps = data.name;

  const fetchUserSites = async (id: number) => {
    const data = await getUserSites(id);
    setUserSites(data.data);
  };

  useEffect(() => {
    fetchUserSites(data.ID);
  }, []);

  return (
    <>
      <Paper shadow="md" p="sm" my="md" sx={{ height: "auto" }}>
        <UserSitesTable
          name={nameProps}
          data={userSites}
          idColumn={"id"}
          ignoreColumn={["client_location_ID", "id"]}
          columnHeadings={["Sites", "Action"]}
        />
      </Paper>
    </>
  );
};

export default UserSites;
