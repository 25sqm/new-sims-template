import React, {useState, useEffect} from 'react'

import { getDevices } from '../../api/devices';
import { Text, Paper, Divider, Button, Pagination } from '@mantine/core';
import { DeviceMgtTable } from '../../modules/admin/DeviceMgtTable';


interface RowData {
  deviceID: string,
  deviceType: string,
  deviceCode: string,
  area: string,
  level: string,
  dateDeployed: string,
  timeDeployed: string,
  dateRemoved: string,
  frequency: string
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
        <Text size="xl">Device Identification</Text>
        <Divider my="sm" />  
        <DeviceMgtTable />
        </Paper>
    </>
  )
}

export default DeviceManagement