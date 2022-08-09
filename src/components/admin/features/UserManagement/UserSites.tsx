import React, { useEffect, useState } from "react";
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
  Skeleton,
  Table,
  Text,
} from "@mantine/core";
import { userAccess } from "../../dummyData";
import { useLocation } from "react-router-dom";
import { getUserSites } from "../../../../api/user";
import { useModals } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { CirclePlus, Edit, TrashX } from "tabler-icons-react";

const UserSites = () => {
  const [userSites, setUserSites] = useState([]);
  const location = useLocation();
  const { data }: any = location.state;
  const nameProps = data.name;

  const fetchUserSites = async (id: number) => {
    const data = await getUserSites(id);
    setUserSites(data.data);
  };

  useEffect(() => {
    fetchUserSites(data.ID);
  }, []);

  return (
    <>
      <Paper shadow="md" p="sm" my="md" sx={{ height: "auto" }}>
        <UserSitesTable
          name={nameProps}
          data={userSites}
          idColumn={"id"}
          ignoreColumn={["client_location_ID", "id"]}
          columnHeadings={["Sites", "Action"]}
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
  data: Array<{ site: string; id: number; client_location_id: number }>;
  description?: string;
  idColumn: string;
  ignoreColumn?: Array<string>;
  columnHeadings?: Array<string>;
  testLog?: (message: any) => void;
}

const possibleSites = [
  "Nutri Asia Incorporated - Marilao Plant",
  "Sterix Incorporated",
  "Mead Johnson Nutrition Incorporated - Philippines",
];

const UserSitesTable = ({
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
    if (data.length > 0) {
      setDataRendered(data.slice(0, 9));
    }
    setTimeout(function () {
      setLoading(false);
    }, 300);
  }, [data]);

  // MODAL FUNCTIONS
  // @TODO: NO ROUTE YET FOR USER SITES (no way to know what are the sites and what are their IDs; their IDs are needed for the /api/admin/user/site-assignment/search and crud routes)

  const openAddRoleModal = () => {
    console.log(dataRendered);
    let addModalRole = "";
    modals.openConfirmModal({
      title: "Add Site",
      children: (
        <NativeSelect
          onChange={(e) => {
            addModalRole = e.currentTarget.value;
            console.log(addModalRole);
          }}
          data={possibleSites}
          label="Site"
        />
      ),
      labels: { confirm: "Add Site", cancel: "Cancel" },
      onCancel: () => console.log("You Cancelled"),
      onConfirm: () => {
        setDataRendered([
          ...dataRendered,
          {
            siteName: addModalRole,
            id: String(data.length + 1),
          },
        ]);
        console.log("You confirmed");
      },
    });
  };

  const openEditModal = ({ row }: any) => {
    let editRoleName = row.siteName;
    modals.openConfirmModal({
      title: "Edit This User",
      children: (
        <form onSubmit={(event) => event.preventDefault()}>
          <NativeSelect
            placeholder={row.siteName}
            onChange={(e) => {
              editRoleName = e.currentTarget.value;
            }}
            data={possibleSites}
            label="Site"
          />
        </form>
      ),
      labels: { confirm: "Submit", cancel: "Cancel" },
      onCancel: () => console.log("You Cancelled"),
      onConfirm: () => {
        setDataRendered([
          ...dataRendered.map((item: any) =>
            item.id === row.id ? { ...item, siteName: editRoleName } : item
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
            Are you sure you want to delete "{row.siteName}" role from {name}?
          </Text>
        </>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      onCancel: () => console.log("You Cancelled"),
      onConfirm: () => {
        const newDataRendered = dataRendered.filter((element: any) => {
          return element.id !== row.id;
        });
        setDataRendered(newDataRendered);
        showNotification({
          title: `You have successfully deleted ${row.siteName}`,
          message: "This is a future functionality",
          autoClose: 3000,
          color: "green",
        });
        console.log("You tried to delete ", row.siteName);
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

  const rows = dataRendered.map((row: any) => {
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
            User Sites: {user}
          </Text>
          <Button
            onClick={() => {
              openAddRoleModal();
            }}
            variant="outline"
            leftIcon={<CirclePlus />}
          >
            Add Site
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

export default UserSites;
