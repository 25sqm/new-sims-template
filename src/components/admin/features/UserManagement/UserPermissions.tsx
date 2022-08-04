import React, { NewLifecycle, useEffect, useState } from "react";
import {
  ActionIcon,
  Button,
  createStyles,
  Divider,
  Group,
  NativeSelect,
  Pagination,
  Paper,
  ScrollArea,
  Select,
  Skeleton,
  Table,
  Text,
} from "@mantine/core";
import UserAccessTable from "../../../../modules/admin/UserManagement/UserAccessTable";
import { userAccess } from "../../dummyData";
import { useLocation } from "react-router-dom";
import {
  addUserPermission,
  deleteUserPermission,
  editUserPermission,
  getUserPermissions,
} from "../../../../api/user";
import { useModals } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { CirclePlus, Edit, TrashX } from "tabler-icons-react";

const UserPermissions = () => {
  const [userPermissions, setUserPermissions] = useState([]);
  const location = useLocation();
  const { data }: any = location.state;
  console.log("data", data);
  const nameProps = data.name;

  const fetchRolePermissions = async (id: number) => {
    const data = await getUserPermissions(id);
    setUserPermissions(data.data);
  };

  useEffect(() => {
    fetchRolePermissions(data.ID);
  }, []);

  return (
    <>
      <Paper shadow="md" p="sm" my="md" sx={{ height: "auto" }}>
        <UserPermissionsTable
          role={data.Name}
          roleID={data.ID}
          fetchRolePermissions={fetchRolePermissions}
          data={userPermissions}
          idColumn={"ID"}
          ignoreColumn={["actionbtn", "ID", "permission_id", "page_id"]}
          columnHeadings={["Page", "Permission", "Action"]}
        />
      </Paper>
    </>
  );
};

const useStyles = createStyles((theme) => ({
  th: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  td: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  control: {
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  icon: {
    width: 21,
    height: 21,
    borderRadius: 21,
  },
}));

interface Props {
  role: string;
  data: Array<{
    ID: number;
    pagetitle: string;
    permission: string;
    actionbtn: string;
  }>;
  description?: string;
  idColumn: string;
  roleID: number;
  fetchRolePermissions: Function;
  ignoreColumn?: Array<string>;
  columnHeadings?: Array<string>;
  testLog?: (message: any) => void;
}

const UserPermissionsTable = ({
  role,
  data,
  description,
  idColumn,
  roleID,
  fetchRolePermissions,
  ignoreColumn,
  columnHeadings,
}: Props) => {
  const { classes } = useStyles();
  const [loading, setLoading] = useState<boolean>(true);
  const [activePage, setPage] = useState<number>(1);
  const [currentLimit, setCurrentLimit] = useState<number>(10);
  const [dataRendered, setDataRendered] = useState<any>([]);
  // const [addModalRole, setAddModalRole] = useState(data.roles[0].roleName);
  const modals = useModals();
  useEffect(() => {
    setTimeout(function () {
      setLoading(false);
    }, 300);
    if (data.length > 0) {
      setDataRendered(data.slice(0, 9));
    }
  }, [data]);

  const refetch = async () => {
    fetchRolePermissions(roleID);
    setPage(1);
    reloadData(1);
  };

  const reloadData = (page: number) => {
    setLoading(true);
    const lowerBound = page * 10 - 10;
    const upperBound = page * 10 - 1;
    setDataRendered(data.slice(lowerBound, upperBound));
    setLoading(false);
  };

  // MODAL FUNCTIONS

  const openAddRoleModal = () => {
    let addPermission = { page_ID: 1, permission: 1 };
    modals.openConfirmModal({
      title: "Add Role",
      children: (
        <>
          <Select
            onChange={(value) => {
              addPermission.page_ID = Number(value);
            }}
            placeholder="Choose a page"
            data={[
              { value: "1", label: "Dashboard" },
              { value: "2", label: "Device Identification" },
              { value: "3", label: "Device Deployment" },
              { value: "4", label: "Device Monitoring" },
              { value: "5", label: "Device Threshold" },
              { value: "6", label: "Service Order" },
              { value: "7", label: "Service Order Tasks" },
              { value: "8", label: "Service Order Area" },
              { value: "9", label: "Area Threshold" },
              { value: "10", label: "User Info" },
              { value: "11", label: "User Access" },
              { value: "12", label: "Device Monitoring Pest Found" },
              { value: "13", label: "Area Monitoring" },
              { value: "14", label: "Monitoring Pest Found" },
              { value: "15", label: "Area Monitoring Details" },
              { value: "16", label: "Client Information" },
              { value: "17", label: "Client Contract" },
              { value: "18", label: "site Information" },
              { value: "19", label: "Area Information" },
              { value: "20", label: "Client Contract Services" },
              { value: "21", label: "Pest Trending per Month" },
              { value: "22", label: "User Roles" },
              { value: "23", label: "Role Permissions" },
              { value: "24", label: "Site Assignment" },
              { value: "25", label: "Real-time Device Monitoring" },
              { value: "26", label: "My Sites" },
              { value: "27", label: "Threshold Breach Incident" },
              { value: "28", label: "Bait Station Monitoring" },
              { value: "29", label: "Service Order Activities" },
              { value: "30", label: "Actual Treatment Activities" },
              { value: "31", label: "Pest Incidence Map" },
              { value: "32", label: "Critical Pests" },
              { value: "33", label: "Summary of Pest Count" },
              { value: "34", label: "Pest Trends and Thresholds" },
            ]}
            label="Page"
          />
          <Select
            onChange={(value) => {
              addPermission.permission = Number(value);
            }}
            placeholder="Choose Permissions Type"
            data={[
              { value: "1", label: "View Only" },
              { value: "2", label: "Add/Edit/Delete" },
            ]}
            label="Permission"
          />
        </>
      ),
      labels: { confirm: "Add Role", cancel: "Cancel" },
      onCancel: () => console.log("You Cancelled"),
      onConfirm: () => {
        addUserPermission(
          roleID,
          addPermission.page_ID,
          addPermission.permission
        );
        refetch();
        showNotification({
          title: "Edit success!",
          message: `You've successfully added a new permission`,
          autoClose: 3000,
          color: "green",
        });
      },
    });
  };

  const openEditModal = ({ row }: any) => {
    let editPermission = {
      page_ID: 1,
      permission: 1,
    };
    modals.openConfirmModal({
      title: "Edit This User",
      children: (
        <>
          <Select
            onChange={(value) => {
              editPermission.page_ID = Number(value);
            }}
            placeholder={row.pagetitle}
            data={[
              { value: "1", label: "Dashboard" },
              { value: "2", label: "Device Identification" },
              { value: "3", label: "Device Deployment" },
              { value: "4", label: "Device Monitoring" },
              { value: "5", label: "Device Threshold" },
              { value: "6", label: "Service Order" },
              { value: "7", label: "Service Order Tasks" },
              { value: "8", label: "Service Order Area" },
              { value: "9", label: "Area Threshold" },
              { value: "10", label: "User Info" },
              { value: "11", label: "User Access" },
              { value: "12", label: "Device Monitoring Pest Found" },
              { value: "13", label: "Area Monitoring" },
              { value: "14", label: "Monitoring Pest Found" },
              { value: "15", label: "Area Monitoring Details" },
              { value: "16", label: "Client Information" },
              { value: "17", label: "Client Contract" },
              { value: "18", label: "site Information" },
              { value: "19", label: "Area Information" },
              { value: "20", label: "Client Contract Services" },
              { value: "21", label: "Pest Trending per Month" },
              { value: "22", label: "User Roles" },
              { value: "23", label: "Role Permissions" },
              { value: "24", label: "Site Assignment" },
              { value: "25", label: "Real-time Device Monitoring" },
              { value: "26", label: "My Sites" },
              { value: "27", label: "Threshold Breach Incident" },
              { value: "28", label: "Bait Station Monitoring" },
              { value: "29", label: "Service Order Activities" },
              { value: "30", label: "Actual Treatment Activities" },
              { value: "31", label: "Pest Incidence Map" },
              { value: "32", label: "Critical Pests" },
              { value: "33", label: "Summary of Pest Count" },
              { value: "34", label: "Pest Trends and Thresholds" },
            ]}
            label="Page"
          />
          <Select
            onChange={(value) => {
              editPermission.permission = Number(value);
            }}
            placeholder={row.permission_name}
            data={[
              { value: "1", label: "View Only" },
              { value: "2", label: "Add/Edit/Delete" },
            ]}
            label="Permission"
          />
        </>
      ),
      labels: { confirm: "Submit", cancel: "Cancel" },
      onCancel: () => console.log("You Cancelled"),
      onConfirm: () => {
        editUserPermission(
          row.ID,
          editPermission.page_ID,
          editPermission.permission
        );
        refetch();
        showNotification({
          title: "Edit success!",
          message: `You successfully edited the permission on page ${row.pagetitle}`,
          autoClose: 3000,
          color: "green",
        });
      },
    });
  };

  const openDeleteModal = ({ row }: any) => {
    modals.openConfirmModal({
      title: "Delete User",
      children: (
        <>
          <Text>
            Are you sure you want to delete "{row.pagetitle}" permission?
          </Text>
        </>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      onCancel: () => console.log("You Cancelled"),
      onConfirm: () => {
        deleteUserPermission(row.ID);
        refetch();
        showNotification({
          title: `Success!`,
          message: "You have successfully deleted a user permission!",
          autoClose: 3000,
          color: "green",
        });
        console.log("You tried to delete ", row.roleName);
      },
    });
  };

  // END MODAL FUNCTIONS

  const columnStrings: string[] = columnHeadings
    ? columnHeadings
    : Object.keys(data);
  const columns = columnStrings.map((heading) => (
    <th className={classes.th}>{heading}</th>
  ));

  const rows = dataRendered.map((row: any, index: any) => {
    const unique = row[idColumn];
    return (
      <tr key={unique}>
        {Object.keys(row)
          .filter((element) => {
            if (ignoreColumn === undefined) return element;
            if (!ignoreColumn.includes(element)) {
              return element;
            }
            // This filter function ultimately removes the indicated columns to ignore using the ignoreColumn props
          })
          .map((rowdata) => {
            return (
              <td className={classes.td}>
                {row[rowdata].toString().match(/<[^>]*>/) !== null
                  ? ""
                  : row[rowdata]}
              </td>
              // We loop through the remaining elements of row data to create
              // table rows
            );
          })}
        <td>
          <Group>
            <ActionIcon
              onClick={() => {
                openEditModal({ row });
              }}
            >
              <Edit size={15} />
            </ActionIcon>
            <ActionIcon
              onClick={() => {
                openDeleteModal({ row });
              }}
            >
              <TrashX size={15} />
            </ActionIcon>
          </Group>
        </td>
      </tr>
    );
  });

  return (
    <>
      <Skeleton visible={loading}>
        {description ? (
          <Text size="xl" color="dimmed">
            {description}
          </Text>
        ) : (
          <></>
        )}

        <Group align="center" mb="md">
          <Text p={10} size="lg">
            Role Permissions: {role}
          </Text>
          <Button
            onClick={() => {
              openAddRoleModal();
            }}
            variant="outline"
            leftIcon={<CirclePlus />}
          >
            Add Permission
          </Button>
        </Group>
        <Divider />
        <ScrollArea sx={{ height: "auto" }}>
          <Table
            fontSize={12}
            horizontalSpacing="md"
            verticalSpacing="xs"
            striped
            highlightOnHover
            sx={{ tableLayout: "auto", minWidth: 700 }}
          >
            <thead>
              <tr>{columns}</tr>
            </thead>
            <tbody>
              {rows.length > 0 ? (
                rows
              ) : (
                <tr>
                  <td colSpan={9}>
                    <Text color="dimmed" weight={500} align="center">
                      Nothing found
                    </Text>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </ScrollArea>
      </Skeleton>
      <Group>
        <Text></Text>
        {data.length >= 9 ? (
          <Pagination
            my="sm"
            page={activePage}
            onChange={(page) => {
              reloadData(page);
              setPage(page);
            }}
            total={Math.ceil(data.length / 10)}
          />
        ) : (
          <></>
        )}
      </Group>
    </>
  );
};

export default UserPermissions;
