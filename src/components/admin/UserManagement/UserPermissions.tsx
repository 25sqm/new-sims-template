import React, { useEffect } from "react";
import { Paper } from "@mantine/core";
import UserAccessTable from "../../../modules/admin/UserManagement/UserAccessTable";
import { userAccess } from "../dummyData";
import { useLocation } from "react-router-dom";
import UserPermissionsTable from "../../../modules/admin/UserManagement/UserPermissionsTable";

const UserPermissions = () => {
  const location = useLocation();
  const { data }: any = location.state;
  const nameProps = data.name;
  console.log("data with role: ", data);
  const dummyData = [
    {
      ID: 2,
      pagetitle: "Dashboard",
      permission: "Add/Edit/Delete",
      actionbtn:
        "<button class='edit_btn btn btn-xs btn-success' data-id='2' data-page='1' data-permission='2' data-toggle='modal' data-target='#modalEditBtn'><span class='glyphicon glyphicon-pencil'></span></button> <button class='delete_btn btn btn-xs btn-danger' data-id='2' data-toggle='modal' data-target='#modaldeleteBtn'><span class='glyphicon glyphicon-trash'></span></button>",
    },
    {
      ID: 3,
      pagetitle: "Device Identification",
      permission: "Add/Edit/Delete",
      actionbtn:
        "<button class='edit_btn btn btn-xs btn-success' data-id='3' data-page='2' data-permission='2' data-toggle='modal' data-target='#modalEditBtn'><span class='glyphicon glyphicon-pencil'></span></button> <button class='delete_btn btn btn-xs btn-danger' data-id='3' data-toggle='modal' data-target='#modaldeleteBtn'><span class='glyphicon glyphicon-trash'></span></button>",
    },
    {
      ID: 4,
      pagetitle: "Device Monitoring",
      permission: "Add/Edit/Delete",
      actionbtn:
        "<button class='edit_btn btn btn-xs btn-success' data-id='4' data-page='4' data-permission='2' data-toggle='modal' data-target='#modalEditBtn'><span class='glyphicon glyphicon-pencil'></span></button> <button class='delete_btn btn btn-xs btn-danger' data-id='4' data-toggle='modal' data-target='#modaldeleteBtn'><span class='glyphicon glyphicon-trash'></span></button>",
    },
    {
      ID: 5,
      pagetitle: "Device Threshold",
      permission: "Add/Edit/Delete",
      actionbtn:
        "<button class='edit_btn btn btn-xs btn-success' data-id='5' data-page='5' data-permission='2' data-toggle='modal' data-target='#modalEditBtn'><span class='glyphicon glyphicon-pencil'></span></button> <button class='delete_btn btn btn-xs btn-danger' data-id='5' data-toggle='modal' data-target='#modaldeleteBtn'><span class='glyphicon glyphicon-trash'></span></button>",
    },
    {
      ID: 6,
      pagetitle: "Service Order",
      permission: "Add/Edit/Delete",
      actionbtn:
        "<button class='edit_btn btn btn-xs btn-success' data-id='6' data-page='6' data-permission='2' data-toggle='modal' data-target='#modalEditBtn'><span class='glyphicon glyphicon-pencil'></span></button> <button class='delete_btn btn btn-xs btn-danger' data-id='6' data-toggle='modal' data-target='#modaldeleteBtn'><span class='glyphicon glyphicon-trash'></span></button>",
    },
    {
      ID: 7,
      pagetitle: "Service Order Tasks",
      permission: "Add/Edit/Delete",
      actionbtn:
        "<button class='edit_btn btn btn-xs btn-success' data-id='7' data-page='7' data-permission='2' data-toggle='modal' data-target='#modalEditBtn'><span class='glyphicon glyphicon-pencil'></span></button> <button class='delete_btn btn btn-xs btn-danger' data-id='7' data-toggle='modal' data-target='#modaldeleteBtn'><span class='glyphicon glyphicon-trash'></span></button>",
    },
    {
      ID: 8,
      pagetitle: "Service Order Area",
      permission: "Add/Edit/Delete",
      actionbtn:
        "<button class='edit_btn btn btn-xs btn-success' data-id='8' data-page='8' data-permission='2' data-toggle='modal' data-target='#modalEditBtn'><span class='glyphicon glyphicon-pencil'></span></button> <button class='delete_btn btn btn-xs btn-danger' data-id='8' data-toggle='modal' data-target='#modaldeleteBtn'><span class='glyphicon glyphicon-trash'></span></button>",
    },
    {
      ID: 9,
      pagetitle: "Area Threshold",
      permission: "Add/Edit/Delete",
      actionbtn:
        "<button class='edit_btn btn btn-xs btn-success' data-id='9' data-page='9' data-permission='2' data-toggle='modal' data-target='#modalEditBtn'><span class='glyphicon glyphicon-pencil'></span></button> <button class='delete_btn btn btn-xs btn-danger' data-id='9' data-toggle='modal' data-target='#modaldeleteBtn'><span class='glyphicon glyphicon-trash'></span></button>",
    },
    {
      ID: 10,
      pagetitle: "User Info",
      permission: "Add/Edit/Delete",
      actionbtn:
        "<button class='edit_btn btn btn-xs btn-success' data-id='10' data-page='10' data-permission='2' data-toggle='modal' data-target='#modalEditBtn'><span class='glyphicon glyphicon-pencil'></span></button> <button class='delete_btn btn btn-xs btn-danger' data-id='10' data-toggle='modal' data-target='#modaldeleteBtn'><span class='glyphicon glyphicon-trash'></span></button>",
    },
    {
      ID: 11,
      pagetitle: "User Access",
      permission: "Add/Edit/Delete",
      actionbtn:
        "<button class='edit_btn btn btn-xs btn-success' data-id='11' data-page='11' data-permission='2' data-toggle='modal' data-target='#modalEditBtn'><span class='glyphicon glyphicon-pencil'></span></button> <button class='delete_btn btn btn-xs btn-danger' data-id='11' data-toggle='modal' data-target='#modaldeleteBtn'><span class='glyphicon glyphicon-trash'></span></button>",
    },
  ];

  return (
    <>
      <Paper shadow="md" p="sm" my="md" sx={{ height: "auto" }}>
        <UserPermissionsTable
          role={data.Name}
          data={dummyData}
          idColumn={"ID"}
          ignoreColumn={["actionbtn", "ID"]}
          columnHeadings={["Page", "Permission", "Action"]}
        />
      </Paper>
    </>
  );
};

export default UserPermissions;
