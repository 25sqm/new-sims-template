import React from 'react'

import { Text, Paper, Divider } from '@mantine/core';
import { DeviceMgtTable } from '../../modules/admin/DeviceMgtTable';
const DeviceManagement = () => {

  const data = [
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
  return (
    <>
        <Paper shadow="md" p="sm" my="md" sx={{ height: "83vh" }}>
        <Text size="xl">Device Identification</Text>
        <Divider my="sm" />  
        <DeviceMgtTable data={data} />
        </Paper>
    </>
  )
}

export default DeviceManagement