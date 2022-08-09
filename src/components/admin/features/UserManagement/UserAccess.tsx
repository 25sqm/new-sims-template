import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ActionIcon,
  Button,
  createStyles,
  Divider,
  Group,
  Pagination,
  Paper,
  ScrollArea,
  Select,
  Skeleton,
  Table,
  Text,
} from "@mantine/core";
import { userAccess } from "../../dummyData";
import { useLocation } from "react-router-dom";
import {
  addUserAccess,
  deleteUserAccess,
  editUserAccess,
  getUserAccess,
  getUserRoles,
} from "../../../../api/user";
import { useModals } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { CirclePlus, Edit, TrashX } from "tabler-icons-react";

const UserAccess = () => {
  const [userAccessData, setUserAccessData] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  const location = useLocation();
  const { data }: any = location.state;

  const fetchUserAccess = async (id: number) => {
    const data = await getUserAccess(id);
    setUserAccessData(data.data);
  };

  const rolesDropdownPopulate = async () => {
    const rolesData = await getUserRoles();
    const uniqueRoles = rolesData.data.map((role: any) => {
      return { value: role.ID, label: role.Name };
    });

    setUserRoles(uniqueRoles);
  };

  useEffect(() => {
    fetchUserAccess(data.ID);
    rolesDropdownPopulate();
  }, []);

  return (
    <>
      <Paper shadow="md" p="sm" my="md" sx={{ height: "auto" }}>
        <UserAccessTable
          name={data.name}
          userID={data.ID}
          data={userAccessData}
          fetchUserAccess={fetchUserAccess}
          idColumn={"role_id"}
          ignoreColumn={["role_id", "actionbtn", "user_access_ID"]}
          columnHeadings={["Roles", "Action"]}
          possibleAccessRoles={userRoles}
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
  name: string;
  data: Array<{ role_id: number; roles: string; user_access_ID: number }>;
  description?: string;
  idColumn: string;
  ignoreColumn?: Array<string>;
  columnHeadings?: Array<string>;
  fetchUserAccess: Function;
  possibleAccessRoles: Array<{ value: string; label: string }>;
  userID: number;
}

const UserAccessTable = ({
  name,
  data,
  description,
  idColumn,
  ignoreColumn,
  columnHeadings,
  fetchUserAccess,
  possibleAccessRoles,
  userID,
}: Props) => {
  const { classes } = useStyles();
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState(name);
  const [activePage, setPage] = useState<number>(1);
  const [currentLimit, setCurrentLimit] = useState<number>(10);
  const [dataRendered, setDataRendered] = useState<any>([]);
  // const [addModalRole, setAddModalRole] = useState(data.roles[0].roleName);
  const modals = useModals();
  useEffect(() => {
    setDataRendered(data.slice(0, 10));
    setTimeout(function () {
      setLoading(false);
    }, 300);
  }, [data]);

  const refetch = async () => {
    fetchUserAccess(userID);
    setPage(1);
    reloadData(1);
  };

  const reloadData = (page: number) => {
    setLoading(true);
    setDataRendered(data.slice(0, 10));
    setLoading(false);
  };

  // MODAL FUNCTIONS

  const openAddRoleModal = () => {
    console.log(dataRendered);
    let addModalRole: number;

    modals.openConfirmModal({
      title: "Add Role",
      children: (
        <Select
          placeholder="Select Role"
          onChange={(value: any) => {
            if (value) {
              addModalRole = Number(value);
            } else {
              addModalRole = 1;
            }
          }}
          data={possibleAccessRoles}
          label="Role"
        />
      ),
      labels: { confirm: "Add Role", cancel: "Cancel" },
      onCancel: () => console.log("You Cancelled"),
      onConfirm: () => {
        // setDataRendered([
        //   ...dataRendered,
        //   {
        //     role_id: dataRendered.length + 1,
        //     roles: addModalRole,
        //     user_access_ID: dataRendered.length + 1,
        //   },
        // ]);
        addUserAccess(userID, addModalRole);
        refetch();
        showNotification({
          title: `Success!`,
          message: `You have successfully added a new role`,
          autoClose: 3000,
          color: "green",
        });
      },
    });
  };

  const openEditModal = async ({ row }: any) => {
    let editRoleID: number;
    modals.openConfirmModal({
      title: "Edit This User",
      children: (
        <form onSubmit={(event) => event.preventDefault()}>
          <Select
            placeholder={row.roles}
            onChange={(value: any) => {
              if (value) {
                editRoleID = Number(value);
              } else {
                editRoleID = 1;
              }
            }}
            data={possibleAccessRoles}
            label="Role"
          />
        </form>
      ),
      labels: { confirm: "Submit", cancel: "Cancel" },
      onCancel: () => console.log("You Cancelled"),
      onConfirm: () => {
        // setDataRendered([
        //   ...dataRendered.map((item: any) =>
        //     item.role_id === row.id ? { ...item, roles: editRoleName } : item
        //   ),
        // ]);
        editUserAccess(row.user_access_ID, editRoleID);
        refetch();
        showNotification({
          title: "Edit success!",
          message: "This is a future functionality",
          autoClose: 3000,
          color: "green",
        });
        console.log("you submitted: ", row);
      },
    });
  };

  const openDeleteModal = ({ row }: any) => {
    modals.openConfirmModal({
      title: "Delete User",
      children: (
        <>
          <Text>
            Are you sure you want to delete "{row.roles}" role from {name}?
          </Text>
        </>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      onCancel: () => console.log("You Cancelled"),
      onConfirm: () => {
        //  delete from dataRendered
        setDataRendered(
          dataRendered.filter((item: any) => item.role_id !== row.id)
        );
        deleteUserAccess(row.user_access_ID);
        refetch();
        showNotification({
          title: `You have successfully deleted ${row.roleName}`,
          message: "This is a future functionality",
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

  const rows =
    dataRendered.length > 0 ? (
      dataRendered.map((row: any, index: number) => {
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
      })
    ) : (
      <></>
    );

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
            User Access: {user}
          </Text>
          <Button
            onClick={() => {
              openAddRoleModal();
            }}
            variant="outline"
            leftIcon={<CirclePlus />}
          >
            Add Role
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
              // reloadData(page);
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

export default UserAccess;
