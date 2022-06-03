import React, {useState, useEffect} from 'react'

import { getDevices } from '../../api/devices';
import { Text, Paper, Divider, Button, Pagination } from '@mantine/core';
import { DeviceMgtTable } from '../../modules/admin/DeviceMgtTable';
const DeviceManagement = () => {

  const dummyData = [
    {
      'deviceType': 'Rodent Bait Station (Tamper Proof)',
      'deviceCode': 'STX-RBT-1712-0001-COK-CBP-GA1-001',
      'area': 'Gate 1',
      'level': 'Level 1',
      'dateDeployed': '',
      'timeDeployed': '',
      'dateRemoved': '',
      'frequency': 'Th'
    },
    {
      'deviceType': 'Rodent Bait Station (Tamper Proof)',
      'deviceCode': 'STX-RBT-1712-0002-COK-CBP-NEG-002',
      'area': 'Gate 1',
      'level': 'Level 1',
      'dateDeployed': '',
      'timeDeployed': '',
      'dateRemoved': '',
      'frequency': 'Th'
    },
    {
      'deviceType': 'Rodent Bait Station (Tamper Proof)',
      'deviceCode': 'STX-RBT-1712-0003-COK-CBP-NEG-003',
      'area': 'Gate 1',
      'level': 'Level 1',
      'dateDeployed': '',
      'timeDeployed': '',
      'dateRemoved': '',
      'frequency': 'Th'
    },
    {
      'deviceType': 'Rodent Bait Station (Tamper Proof)',
      'deviceCode': 'STX-RBT-1712-0004-COK-CBP-NEG-004',
      'area': 'Gate 1',
      'level': 'Level 1',
      'dateDeployed': '',
      'timeDeployed': '',
      'dateRemoved': '',
      'frequency': 'Th'
    },
    {
      'deviceType': 'Rodent Bait Station (Tamper Proof)',
      'deviceCode': 'STX-RBT-1712-0005-COK-CBP-NEG-005',
      'area': 'Gate 1',
      'level': 'Level 1',
      'dateDeployed': '',
      'timeDeployed': '',
      'dateRemoved': '',
      'frequency': 'Th'
    },
  ]

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

  const [tableData, setTableData] = useState<TableSortProps>({ data: [] });
  const [queryData, setQueryData] = useState({});
  const [activePage, setPage] = useState(1);

  const getData = async () => {
    const response = await getDevices(1);
    return response.data;
  }

  const encodeData = async (data : Object[]) => {
    let tableData : RowData[] = [];
    data.forEach((element : any) => {
      let freqString = "";
      if (element.f_m !== 0) {
        freqString.concat("M");
      }

      if (element.f_t !== 0) {
        freqString.concat(", ", "T");
      }

      if (element.f_w !== 0) {
        freqString.concat(", ", "W");
      }

      if (element.f_th !== 0) {
        freqString.concat(", ", "Th");
      }

      if (element.f_f !== 0) {
        freqString.concat(", ", "F");
      }

      if (element.f_sat !== 0) {
        freqString.concat(", ", "Sa");
      }

      if (element.f_sun !== 0) {
        freqString.concat(", ", "Sun");
      }

      const dateDeployed = new Date(element.date_deployed).toLocaleDateString();
      const timeDeployed = new Date(element.time_deployed).toLocaleTimeString();
      const dateRemoved = new Date(element.date_removed).toLocaleDateString();
      const level = element.level === null ? "" : element.level.toString();
      const area = element.client_location_ID.toString();

      const tableObject = {
        deviceID: element.device_ID.toString(),
        deviceType: element.device_type_name,
        deviceCode: element.device_code,
        area: area,
        level: level,
        dateDeployed: dateDeployed,
        timeDeployed: timeDeployed,
        dateRemoved: dateRemoved,
        frequency: freqString,
      };
      tableData.push(tableObject);
    });
    const tableProps : TableSortProps = {
      data: tableData,
    };

    return tableProps;
  }

  useEffect(() => {
    (async () => {
      const NewQueryData = await getDevices(1);
      setQueryData(NewQueryData);
      console.log(encodeData(NewQueryData.data.data))
  })();
}, [])
  return (
    <>
        <Paper shadow="md" p="sm" my="md" sx={{ height: "auto" }}>
        <Text size="xl">Device Identification</Text>
        <Divider my="sm" />  
        <DeviceMgtTable data={tableData.data} />
        
        <Pagination my='sm' page={activePage} onChange={setPage} total={12605}/>
        </Paper>
    </>
  )
}

export default DeviceManagement