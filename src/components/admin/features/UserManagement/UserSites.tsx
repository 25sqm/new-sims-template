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
  Select,
  Skeleton,
  Table,
  Text,
} from "@mantine/core";
import { userAccess } from "../../dummyData";
import { useLocation } from "react-router-dom";
import {
  addUserSite,
  deleteUserSite,
  editUserSite,
  getUserSites,
} from "../../../../api/user";
import { useModals } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { CirclePlus, Edit, TrashX } from "tabler-icons-react";
import { getSites } from "../../../../api/service-orders";

const UserSites = () => {
  const [userSites, setUserSites] = useState([]);
  const [sitesDropdown, setSitesDropdown] = useState([]);
  const location = useLocation();
  const { data }: any = location.state;
  const nameProps = data.name;

  const fetchUserSites = async (id: number) => {
    const data = await getUserSites(id);
    setUserSites(data.data);
  };

  const populateDropdowns = async () => {
    const response = await getSites();
    const possibleSites = response.data.map((site: any) => {
      return {
        value: site.client_location_ID,
        label: site.client_location_name,
      };
    });
    setSitesDropdown(possibleSites);
  };

  useEffect(() => {
    fetchUserSites(data.ID);
    populateDropdowns();
  }, []);

  return (
    <>
      <Paper shadow="md" p="sm" my="md" sx={{ height: "auto" }}>
        <UserSitesTable
          name={nameProps}
          userID={data.ID}
          data={userSites}
          fetchUserSites={fetchUserSites}
          idColumn={"id"}
          possibleSites={sitesDropdown}
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
  userID: number;
  possibleSites: Array<{ value: string; label: string }>;
  fetchUserSites: Function;
}

const UserSitesTable = ({
  name,
  data,
  description,
  idColumn,
  userID,
  ignoreColumn,
  possibleSites,
  fetchUserSites,
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

  const refetch = () => {
    fetchUserSites(userID);
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
  // @TODO: NO ROUTE YET FOR USER SITES (no way to know what are the sites and what are their IDs; their IDs are needed for the /api/admin/user/site-assignment/search and crud routes)

  const openAddRoleModal = () => {
    console.log(dataRendered);
    let addModalRole: any = "";
    modals.openConfirmModal({
      title: "Add Site",
      children: (
        <Select
          onChange={(value) => {
            addModalRole = value;
          }}
          data={possibleSites}
          label="Site"
        />
      ),
      labels: { confirm: "Add Site", cancel: "Cancel" },
      onCancel: () => console.log("You Cancelled"),
      onConfirm: () => {
        addUserSite({ user_ID: userID, site: addModalRole });
        refetch();
        showNotification({
          title: `Success!`,
          message: `You have successfully added a new site`,
          autoClose: 3000,
          color: "green",
        });
      },
    });
  };

  const openEditModal = ({ row }: any) => {
    let editRoleName = row.siteName;
    modals.openConfirmModal({
      title: "Edit This User",
      children: (
        <form onSubmit={(event) => event.preventDefault()}>
          <Select
            placeholder={row.site}
            onChange={(value) => {
              editRoleName = value;
            }}
            data={possibleSites}
            label="Site"
          />
        </form>
      ),
      labels: { confirm: "Submit", cancel: "Cancel" },
      onCancel: () => console.log("You Cancelled"),
      onConfirm: () => {
        editUserSite({ id: row.id, site: editRoleName });
        refetch();
        showNotification({
          title: "Edit success!",
          message: "You have successfully edited this site",
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
            Are you sure you want to delete "{row.site}" role from {name}?
          </Text>
        </>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      onCancel: () => console.log("You Cancelled"),
      onConfirm: () => {
        deleteUserSite({ id: row.id });
        refetch();
        showNotification({
          title: `Success!`,
          message: `You have successfully deleted ${row.siteName}`,
          autoClose: 3000,
          color: "green",
        });
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
