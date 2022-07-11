import React from "react";

import { Text, Paper, Divider, Tabs } from "@mantine/core";
import UserMgtTable from "../../../modules/admin/UserManagement/UserMgtTable";
import TableRender from "../../../modules/admin/TableRender";
import { userRoles, userAccess, userSites } from "../dummyData";
import UserAccessTable from "../../../modules/admin/UserManagement/UserAccessTable";
import UserRolesTable from "./UserRoles";
const UserManagement = () => {
  const data = [
    {
      name: "Vivay Supervisor Test",
      birthday: "1988-04-18",
      sex: "F",
      username: "VivaySupervisorTest",
      emailAddress: "vrsalazar.25sqm@gmail.com",
      mobileNumber: "",
      landline: "",
      address: "",
      organization: "Sterix Incorporated - Unit 1201",
    },
    {
      name: "Vivay Salazar",
      birthday: "",
      sex: "F",
      username: "Vivay",
      emailAddress: "vivay.salazar@gmail.com",
      mobileNumber: "09618427133",
      landline: "",
      address: "",
      organization: "Nutri Asia Incorporated - Marilao Plant",
    },
    {
      name: "URC Dionelle Panopio",
      birthday: "",
      sex: "M",
      username: "Dionelle Panopio",
      emailAddress: "Dionelle.Arellano-Panopio@urc.com.ph",
      mobileNumber: "09618427133",
      landline: "",
      address: "",
      organization: "Universal Robina Corporation - Binan Plant",
    },
    {
      name: "System Administrator",
      birthday: "",
      sex: "M",
      username: "SysAdmin",
      emailAddress: "onlinedata_admin@sterix.net",
      mobileNumber: "123",
      landline: "",
      address: "",
      organization: "Sterix Incorporated - Unit 701",
    },
    {
      name: "Sterix Client",
      birthday: "",
      sex: "M",
      username: "STXClient",
      emailAddress: "onlinedata_admin@sterix.net",
      mobileNumber: "123",
      landline: "",
      address: "",
      organization: "Sterix Incorporated - Unit 1201",
    },
    {
      name: "Stella Marie Batalla",
      birthday: "",
      sex: "F",
      username: "Stella",
      emailAddress: "Stellamarie.batalla@sterix.net",
      mobileNumber: "09555077860",
      landline: "",
      address: "",
      organization: "Starbucks Madrigal Avenue",
    },
    {
      name: "SB Tech",
      birthday: "",
      sex: "F",
      username: "Stella",
      emailAddress: "tengbatalla16@gmail.com",
      mobileNumber: "",
      landline: "",
      address: "",
      organization: "Starbucks Madrigal Avenue",
    },
    {
      name: "Ronald Abrera",
      birthday: "",
      sex: "M",
      username: "Ronald",
      emailAddress: "csnadabrera@gmail.com",
      mobileNumber: "09159885955",
      landline: "",
      address: "",
      organization: "Sterix Incorporated - Unit 1201",
    },
    {
      name: "Rolando Tolentino",
      birthday: "",
      sex: "M",
      username: "RTOLENTINO",
      emailAddress: "juneext.tat@gmail.com",
      mobileNumber: "",
      landline: "",
      address: "",
      organization: "Mead Johnson Nutrition Incorporated - Philippines",
    },
    {
      name: "Reynaldo Sillo Jr.",
      birthday: "",
      sex: "M",
      username: "Reynaldo",
      emailAddress: "reynaldo.sillo@sterix.net",
      mobileNumber: "",
      landline: "",
      address: "",
      organization: "Dole Philippines - Dole UVO",
    },
    {
      name: "Reynaldo Lacebal",
      birthday: "",
      sex: "M",
      username: "RLACEBAL",
      emailAddress: "nutriasiamarilaosims@gmail.com",
      mobileNumber: "",
      landline: "",
      address: "",
      organization: "Nutri Asia Incorporated - Marilao Plant",
    },
  ];

  const rolesData = [
    {
      Permissions: "<a href='role_permissions.php?id=1'>Permissions</a>",
      ID: 1,
      Name: "Sterix Administrator",
      Description: "Sterix Administrator ",
      Type: "Admin",
      actionbtn:
        "<button class='edit_btn btn btn-xs btn-success' data-id='1' data-name='Sterix Administrator' data-description='Sterix Administrator ' data-type='1' data-toggle='modal' data-target='#modalEditBtn'><span class='glyphicon glyphicon-pencil'></span></button> <button class='delete_btn btn btn-xs btn-danger' data-id='1' data-toggle='modal' data-target='#modaldeleteBtn'><span class='glyphicon glyphicon-trash'></span></button>",
    },
    {
      Permissions: "<a href='role_permissions.php?id=2'>Permissions</a>",
      ID: 2,
      Name: "Client Company Administrator",
      Description: "Client Company Administrator",
      Type: "Client",
      actionbtn:
        "<button class='edit_btn btn btn-xs btn-success' data-id='2' data-name='Client Company Administrator' data-description='Client Company Administrator' data-type='2' data-toggle='modal' data-target='#modalEditBtn'><span class='glyphicon glyphicon-pencil'></span></button> <button class='delete_btn btn btn-xs btn-danger' data-id='2' data-toggle='modal' data-target='#modaldeleteBtn'><span class='glyphicon glyphicon-trash'></span></button>",
    },
    {
      Permissions: "<a href='role_permissions.php?id=3'>Permissions</a>",
      ID: 3,
      Name: "Sterix Technician",
      Description: "Sterix Technician",
      Type: "Technician",
      actionbtn:
        "<button class='edit_btn btn btn-xs btn-success' data-id='3' data-name='Sterix Technician' data-description='Sterix Technician' data-type='3' data-toggle='modal' data-target='#modalEditBtn'><span class='glyphicon glyphicon-pencil'></span></button> <button class='delete_btn btn btn-xs btn-danger' data-id='3' data-toggle='modal' data-target='#modaldeleteBtn'><span class='glyphicon glyphicon-trash'></span></button>",
    },
    {
      Permissions: "<a href='role_permissions.php?id=4'>Permissions</a>",
      ID: 4,
      Name: "Sterix Supervisor",
      Description: "Sterix Supervisor",
      Type: "Admin",
      actionbtn:
        "<button class='edit_btn btn btn-xs btn-success' data-id='4' data-name='Sterix Supervisor' data-description='Sterix Supervisor' data-type='1' data-toggle='modal' data-target='#modalEditBtn'><span class='glyphicon glyphicon-pencil'></span></button> <button class='delete_btn btn btn-xs btn-danger' data-id='4' data-toggle='modal' data-target='#modaldeleteBtn'><span class='glyphicon glyphicon-trash'></span></button>",
    },
    {
      Permissions: "<a href='role_permissions.php?id=5'>Permissions</a>",
      ID: 5,
      Name: "Data Encoder",
      Description: "Data Encoder for Operations Department",
      Type: "Admin",
      actionbtn:
        "<button class='edit_btn btn btn-xs btn-success' data-id='5' data-name='Data Encoder' data-description='Data Encoder for Operations Department' data-type='1' data-toggle='modal' data-target='#modalEditBtn'><span class='glyphicon glyphicon-pencil'></span></button> <button class='delete_btn btn btn-xs btn-danger' data-id='5' data-toggle='modal' data-target='#modaldeleteBtn'><span class='glyphicon glyphicon-trash'></span></button>",
    },
    {
      Permissions: "<a href='role_permissions.php?id=6'>Permissions</a>",
      ID: 6,
      Name: "Evaluators",
      Description: "This user will serve as observers of the data and ",
      Type: "Admin",
      actionbtn:
        "<button class='edit_btn btn btn-xs btn-success' data-id='6' data-name='Evaluators' data-description='This user will serve as observers of the data and ' data-type='1' data-toggle='modal' data-target='#modalEditBtn'><span class='glyphicon glyphicon-pencil'></span></button> <button class='delete_btn btn btn-xs btn-danger' data-id='6' data-toggle='modal' data-target='#modaldeleteBtn'><span class='glyphicon glyphicon-trash'></span></button>",
    },
    {
      Permissions: "<a href='role_permissions.php?id=7'>Permissions</a>",
      ID: 7,
      Name: "Office Staff",
      Description: "Office assistant",
      Type: "Admin",
      actionbtn:
        "<button class='edit_btn btn btn-xs btn-success' data-id='7' data-name='Office Staff' data-description='Office assistant' data-type='1' data-toggle='modal' data-target='#modalEditBtn'><span class='glyphicon glyphicon-pencil'></span></button> <button class='delete_btn btn btn-xs btn-danger' data-id='7' data-toggle='modal' data-target='#modaldeleteBtn'><span class='glyphicon glyphicon-trash'></span></button>",
    },
  ];

  return (
    <>
      <Paper shadow="md" p="sm" my="md" sx={{ height: "auto" }}>
        {/* <UserMgtTable data={data} /> */}
        <Tabs>
          <Tabs.Tab label="User Management">
            <UserMgtTable
              data={data}
              idColumn={"name"}
              ignoreColumn={["birthday", "sex", "address"]}
              columnHeadings={[
                "",
                "Name",
                "Username",
                "Email Address",
                "Mobile Number",
                "Landline",
                "Organization",
                "Actions",
              ]}
              filterableHeadings={["organization"]}
            />
          </Tabs.Tab>
          <Tabs.Tab label="User Roles">
            <UserRolesTable
              data={rolesData}
              idColumn={"ID"}
              ignoreColumn={["Permissions", "actionbtn", "ID"]}
              columnHeadings={[
                "",
                "Role Name",
                "Description",
                "Type",
                "Action",
              ]}
            />
          </Tabs.Tab>
        </Tabs>
      </Paper>
    </>
  );
};

export default UserManagement;
