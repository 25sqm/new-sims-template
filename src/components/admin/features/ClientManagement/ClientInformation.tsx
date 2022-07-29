import React, { useEffect } from "react";

import { Paper, Tabs } from "@mantine/core";
import { clientManagement, clientSites } from "../../dummyData";
import TableRender from "../../../../modules/admin/TableRender";
import ClientSitesTable from "../../../../modules/admin/ClientSitesTable";

const ClientManagement = () => {
  return (
    <>
      <Paper shadow="md" p="sm" my="md" sx={{ height: "auto" }}>
        <TableRender
          data={clientManagement}
          idColumn={"ref_no"}
          ignoreColumn={["actionbtn", "ID"]}
          columnHeadings={[
            "Client",
            "Client Code",
            "Description",
            "Permanent Address",
          ]}
          filterableHeadings={["name", "description"]}
        />
      </Paper>
    </>
  );
};

export default ClientManagement;
