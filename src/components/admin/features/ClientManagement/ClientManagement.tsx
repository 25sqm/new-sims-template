import React, { useEffect } from "react";

import { Paper, Tabs } from "@mantine/core";
import { clientManagement, clientSites } from "../../dummyData";
import TableRender from "../../../../modules/admin/TableRender";
import ClientSitesTable from "../../../../modules/admin/ClientSitesTable";

const ClientManagement = () => {
  return (
    <>
      <Paper shadow="md" p="sm" my="md" sx={{ height: "auto" }}>
        <Tabs>
          <Tabs.Tab label="Client Information">
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
          </Tabs.Tab>
          <Tabs.Tab label="Client Sites">
            <ClientSitesTable
              data={clientSites}
              idColumn={"userID"}
              ignoreColumn={["roles", "id"]}
              columnHeadings={["Sites", "Action"]}
            />
          </Tabs.Tab>
        </Tabs>
      </Paper>
    </>
  );
};

export default ClientManagement;
