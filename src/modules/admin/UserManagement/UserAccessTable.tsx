import React, { useState, useEffect } from "react";
import {
  createStyles,
  Table,
  ScrollArea,
  Group,
  Text,
  Pagination,
  Skeleton,
  NativeSelect,
  Button,
  ActionIcon,
  Divider,
} from "@mantine/core";
import { useModals } from "@mantine/modals";

import { Edit, TrashX, CirclePlus, Rollercoaster } from "tabler-icons-react";
import { showNotification } from "@mantine/notifications";

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
  testLog?: (message: any) => void;
}

const possibleAccessRoles = [
  "Client Company Administrator",
  "Data Encoder",
  "Evaluators",
  "Office Staff",
  "Sterix Administrator",
  "Sterix Supervisor",
  "Sterix Technician",
];

const UserAccessTable = ({
  name,
  data,
  description,
  idColumn,
  ignoreColumn,
  columnHeadings,
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
    setDataRendered(data);
    setTimeout(function () {
      setLoading(false);
    }, 300);
  }, [data]);

  // MODAL FUNCTIONS

  const openAddRoleModal = () => {
    console.log(dataRendered);
    let addModalRole = "";
    modals.openConfirmModal({
      title: "Add Role",
      children: (
        <NativeSelect
          onChange={(e) => {
            addModalRole = e.currentTarget.value;
            console.log(addModalRole);
          }}
          data={possibleAccessRoles}
          label="Role"
        />
      ),
      labels: { confirm: "Add Role", cancel: "Cancel" },
      onCancel: () => console.log("You Cancelled"),
      onConfirm: () => {
        setDataRendered([
          ...dataRendered,
          {
            role_id: dataRendered.length + 1,
            roles: addModalRole,
            user_access_ID: dataRendered.length + 1,
          },
        ]);
        console.log("You confirmed");
      },
    });
  };

  const openEditModal = ({ row }: any) => {
    let editRoleName = row.roleName;
    modals.openConfirmModal({
      title: "Edit This User",
      children: (
        <form onSubmit={(event) => event.preventDefault()}>
          <NativeSelect
            placeholder={row.roleName}
            onChange={(e) => {
              editRoleName = e.currentTarget.value;
            }}
            data={possibleAccessRoles}
            label="Role"
          />
        </form>
      ),
      labels: { confirm: "Submit", cancel: "Cancel" },
      onCancel: () => console.log("You Cancelled"),
      onConfirm: () => {
        setDataRendered([
          ...dataRendered.map((item: any) =>
            item.role_id === row.id ? { ...item, roles: editRoleName } : item
          ),
        ]);
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
        const newDataRendered = dataRendered.filter((element: any) => {
          return element.role_id !== row.id;
        });
        setDataRendered(newDataRendered);
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

  const rows = dataRendered.map((row: any, index: number) => {
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
            total={Math.floor(data.length / 10)}
          />
        ) : (
          <></>
        )}
      </Group>
    </>
  );
};

export default UserAccessTable;
