import React from 'react'

import { Title, Text, Paper, Divider, Group, MultiSelect } from '@mantine/core';
import { DateRangePicker } from '@mantine/dates';
import { UserMgtTable } from '../../modules/admin/UserMgtTable';
const UserManagement = () => {
    const data = [
      {
        "name": "Vivay Supervisor Test",
        "birthday": "1988-04-18",
        "sex": "F",
        "username": "VivaySupervisorTest",
        "emailAddress": "vrsalazar.25sqm@gmail.com",
        "mobileNumber": "",
            "landline": "",
            "address": "",
        "organization": "Sterix Incorporated - Unit 1201",
      },
      {
        "name": "Vivay Salazar",
        "birthday": "",
        "sex": "F",
        "username": "Vivay",
        "emailAddress": "vivay.salazar@gmail.com",
        "mobileNumber": "09618427133",
            "landline": "",
            "address": "",
        "organization": "Nutri Asia Incorporated - Marilao Plant",
      },
      {
        "name": "URC Dionelle Panopio",
        "birthday": "",
        "sex": "M",
        "username": "Dionelle Panopio",
        "emailAddress": "Dionelle.Arellano-Panopio@urc.com.ph",
        "mobileNumber": "09618427133",
            "landline": "",
            "address": "",
        "organization": "Universal Robina Corporation - Binan Plant",
      },
      {
        "name": "System Administrator",
        "birthday": "",
        "sex": "M",
        "username": "SysAdmin",
        "emailAddress": "onlinedata_admin@sterix.net",
        "mobileNumber": "123",
            "landline": "",
            "address": "",
        "organization": "Sterix Incorporated - Unit 701",
      },
      {
        "name": "Sterix Client",
        "birthday": "",
        "sex": "M",
        "username": "STXClient",
        "emailAddress": "onlinedata_admin@sterix.net",
        "mobileNumber": "123",
            "landline": "",
            "address": "",
        "organization": "Sterix Incorporated - Unit 1201",
      },
      {
        "name": "Stella Marie Batalla",
        "birthday": "",
        "sex": "F",
        "username": "Stella",
        "emailAddress": "Stellamarie.batalla@sterix.net",
        "mobileNumber": "09555077860",
            "landline": "",
            "address": "",
        "organization": "Starbucks Madrigal Avenue",
      },
      {
        "name": "SB Tech",
        "birthday": "",
        "sex": "F",
        "username": "Stella",
        "emailAddress": "tengbatalla16@gmail.com",
        "mobileNumber": "",
            "landline": "",
            "address": "",
        "organization": "Starbucks Madrigal Avenue",
      },
      {
        "name": "Ronald Abrera",
        "birthday": "",
        "sex": "M",
        "username": "Ronald",
        "emailAddress": "csnadabrera@gmail.com",
        "mobileNumber": "09159885955",
            "landline": "",
            "address": "",
        "organization": "Sterix Incorporated - Unit 1201",
      },
      {
        "name": "Rolando Tolentino",
        "birthday": "",
        "sex": "M",
        "username": "RTOLENTINO",
        "emailAddress": "juneext.tat@gmail.com",
        "mobileNumber": "",
            "landline": "",
            "address": "",
        "organization": "Mead Johnson Nutrition Incorporated - Philippines",
      },
    ]

  return (
    <>
    <Paper shadow="md" p="sm" my="md" sx={{ height: "83vh" }}>
    <Text size="xl">User Management</Text>
              <Divider my="sm" />  
              <UserMgtTable data={data} />
    </Paper>
</>
  )
}

export default UserManagement