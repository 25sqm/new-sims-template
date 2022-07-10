import React, { useEffect } from "react";
import { Paper } from "@mantine/core";
import UserSitesTable from "../../modules/admin/UserSitesTable";
import { userAccess } from "./dummyData";
import { useLocation } from "react-router-dom";

const UserSites = () => {
  const location = useLocation();
  const { data }: any = location.state;
  const nameProps = data.name;
  const dummyData = {
    name: nameProps,
    sites: [
      { siteName: "Nutri Asia Incorporated - Marilao Plant", id: "1" },
      { siteName: "Sterix Incorporated", id: "2" },
      {
        siteName: "Mead Johnson Nutrition Incorporated - Philippines",
        id: "3",
      },
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
        <UserSitesTable
          data={dummyData}
          idColumn={"userID"}
          ignoreColumn={["sites", "id"]}
          columnHeadings={["Sites", "Action"]}
        />
      </Paper>
    </>
  );
};

export default UserSites;
