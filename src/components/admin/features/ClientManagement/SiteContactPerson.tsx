import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ActionIcon,
  Button,
  Card,
  createStyles,
  Divider,
  Group,
  Pagination,
  Paper,
  ScrollArea,
  Select,
  SimpleGrid,
  Skeleton,
  Table,
  Text,
} from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import {
  addUserAccess,
  deleteUserAccess,
  editUserAccess,
  getUserAccess,
  getUserRoles,
  getUsersInfo,
} from "../../../../api/user";
import { useModals } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { CirclePlus, Edit, TrashX } from "tabler-icons-react";
import { getClientContracts, getClientSites } from "../../../../api/clients";
import { getAreasInfo } from "../../../../api/areas";

const SiteContactPerson = () => {
  const [contactPersons, setContactPersons] = useState([]);
  //   const [userRoles, setUserRoles] = useState([]);
  const location = useLocation();
  const { data }: any = location.state;

  const fetchContactPersons = async (id: number) => {
    const data = await getUsersInfo(id);
    setContactPersons(data.data);
  };

  //   const rolesDropdownPopulate = async () => {
  //     const rolesData = await getUserRoles();
  //     const uniqueRoles = rolesData.data.map((role: any) => {
  //       return { value: role.ID, label: role.Name };
  //     });

  //     setUserRoles(uniqueRoles);
  //   };

  useEffect(() => {
    fetchContactPersons(data.ID);
    // rolesDropdownPopulate();
  }, []);

  return (
    <>
      <Paper shadow="md" p="sm" my="md" sx={{ height: "auto" }}>
        <Card shadow="sm" p="lg" radius="md" mb="md" withBorder>
          <SimpleGrid
            cols={2}
            breakpoints={[
              { minWidth: "xs", cols: 1 },
              { minWidth: "sm", cols: 1 },
              { minWidth: "md", cols: 1 },
              { minWidth: 1200, cols: 2 },
            ]}
          >
            <div>
              <Text>Name: {data.name}</Text>
              <Text>Description: {data.description}</Text>
            </div>
            <div>
              <Text>Client Code: {data.code}</Text>
              <Text>Permanent Address: {data.address}</Text>
            </div>
          </SimpleGrid>
        </Card>
        <ContactsTable
          name={data.name}
          userID={data.ID}
          data={contactPersons}
          fetchContactPersons={fetchContactPersons}
          idColumn={"ID"}
          ignoreColumn={[
            "ID",
            "actionbtn",
            "permanent_add",
            "birthday",
            "landline_no",
            "sex",
            "org_id",
          ]}
          columnHeadings={[
            "",
            "Name",
            "Email",
            "Username",
            "Mobile Number",
            "Organization",
            "Actions",
          ]}
          //   possibleAccessRoles={userRoles}
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
  fetchContactPersons: Function;
  //   possibleAccessRoles: Array<{ value: string; label: string }>;
  userID: number;
}

const ContactsTable = ({
  name,
  data,
  description,
  idColumn,
  ignoreColumn,
  columnHeadings,
  fetchContactPersons,
  //   possibleAccessRoles,
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
    if (data.length > 0) {
      setDataRendered(data.slice(0, 10));
    }

    setTimeout(function () {
      setLoading(false);
    }, 300);
  }, [data]);

  const refetch = async () => {
    fetchContactPersons(userID);
    setPage(1);
    reloadData(1);
  };

  const reloadData = (page: number) => {
    setLoading(true);
    const lowerBound = page * 10 - 10;
    const upperBound = page * 10;
    setDataRendered(data.slice(lowerBound, upperBound));
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
          data={[]}
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
            data={[]}
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
            <td>
              <Group noWrap>
                <Link
                  state={{ data: row }}
                  to={`/user/information/access/${row.username}`}
                >
                  <Button variant="subtle" size="xs">
                    Access
                  </Button>
                </Link>
                <Link
                  state={{ data: row }}
                  to={`/user/information/sites/${row.username}`}
                >
                  <Button variant="subtle" size="xs">
                    Sites
                  </Button>
                </Link>
              </Group>
            </td>
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
              <Group noWrap>
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
          <Button
            onClick={() => {
              openAddRoleModal();
            }}
            variant="outline"
            leftIcon={<CirclePlus />}
          >
            Add Area
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
                  <td colSpan={columnStrings.length}>
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
        {data.length >= 10 ? (
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

export default SiteContactPerson;
