import React, { useState, useEffect } from "react";

import { getDevices } from "../../api/devices";
import { Text, Paper, Divider, Tabs } from "@mantine/core";
import { DeviceMgtTable } from "../../modules/admin/DeviceMgtTable";

interface RowData {
  deviceID: string;
  deviceType: string;
  deviceCode: string;
  area: string;
  level: string;
  dateDeployed: string;
  timeDeployed: string;
  dateRemoved: string;
  frequency: string;
}

interface TableSortProps {
  data: RowData[];
}

const DeviceManagement = () => {
  // const [tableData, setTableData] = useState<TableSortProps>({ data: [ ]});
  // const [queryData, setQueryData] = useState({});

  return (
    <>
      <Paper shadow="md" p="sm" my="md" sx={{ height: "auto" }}>
        <Tabs>
          <Tabs.Tab label="Device Information">
            <DeviceMgtTable />
          </Tabs.Tab>
          <Tabs.Tab label="Device Monitoring">
            <DeviceMgtTable />
          </Tabs.Tab>
          <Tabs.Tab label="Real-Time Device Monitoring">
            <DeviceMgtTable />
          </Tabs.Tab>
          <Tabs.Tab label="Device Threshold">
            <DeviceMgtTable />
          </Tabs.Tab>
        </Tabs>
      </Paper>
    </>
  );
};

export default DeviceManagement;
