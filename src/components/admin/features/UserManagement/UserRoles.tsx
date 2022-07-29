import React, { useEffect, useState } from "react";

import {
  Text,
  Paper,
  Divider,
  Tabs,
  Button,
  Title,
  createStyles,
  TextInput,
  NativeSelect,
  Group,
  ActionIcon,
  Skeleton,
  ScrollArea,
  Table,
  Pagination,
  Select,
} from "@mantine/core";
import UserMgtTable from "../../../../modules/admin/UserManagement/UserMgtTable";
import { addUserRole, getUserRoles, getUsersInfo } from "../../../../api/user";
import { showNotification } from "@mantine/notifications";
import { Link } from "react-router-dom";
import { Edit, TrashX } from "tabler-icons-react";
import { useModals } from "@mantine/modals";
const UserRoles = () => {
  const [userRoles, setUserRoles] = useState([]);

  const fetchUserRoles = async () => {
    const data = await getUserRoles();
    setUserRoles(data.data);
  };

  useEffect(() => {
    fetchUserRoles();
  }, []);

  return (
    <>
      <Title
        sx={(theme) => ({
          color: `${
            theme.colorScheme === "dark"
              ? theme.colors.gray[2]
              : theme.colors.dark[3]
          }`,
        })}
        mt={15}
        order={1}
      >
        User Roles
      </Title>
      <Paper shadow="md" p="sm" my="md" sx={{ height: "auto" }}>
        <UserRolesTable
          data={userRoles}
          fetchUserRoles={fetchUserRoles}
          idColumn={"ID"}
          ignoreColumn={["Permissions", "actionbtn", "ID"]}
          columnHeadings={["", "Role Name", "Description", "Type", "Action"]}
        />
      </Paper>
    </>
  );
};

// TABLE RENDER

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
  data: Array<Object>;
  description?: string;
  idColumn: string;
  ignoreColumn?: Array<string>;
  fetchUserRoles: Function;
  columnHeadings?: Array<string>;
  filterableHeadings?: Array<string>;
  actionButtons?: React.ReactNode;
}

const UserRolesTable = ({
  data,
  description,
  idColumn,
  ignoreColumn,
  actionButtons,
  fetchUserRoles,
  columnHeadings,
  filterableHeadings,
}: Props) => {
  const modals = useModals();
  const { classes } = useStyles();
  const [loading, setLoading] = useState<boolean>(true);
  const [activePage, setPage] = useState<number>(1);
  const [currentLimit, setCurrentLimit] = useState<number>(10);
  const [dataRendered, setDataRendered] = useState<any>([]);

  const refetch = async () => {
    fetchUserRoles();
    setPage(1);
    reloadData(1);
  };

  // MODAL FUNCTIONS

  const openAddRoleModal = () => {
    let newRoleObject = {
      Name: "",
      Description: "",
      Type: 1,
    };

    const id = modals.openModal({
      title: "Add User",
      children: (
        <form
          onSubmit={(e) => {
            e.preventDefault();

            // @TODO: Add new user query should be here
            setDataRendered([...dataRendered, newRoleObject]);
            showNotification({
              title: `Success!`,
              message: `You have successfully added ${newRoleObject.Name}`,
              autoClose: 3000,
              color: "green",
            });
            modals.closeModal(id);
          }}
        >
          <TextInput
            label="Name"
            name="Name"
            onChange={(e) => (newRoleObject.Name = e.currentTarget.value)}
          />
          <TextInput
            label="Description"
            name="Description"
            onChange={(e) =>
              (newRoleObject.Description = e.currentTarget.value)
            }
          />
          <Select
            label="Type"
            data={[
              { value: "1", label: "Admin" },
              { value: "2", label: "Client" },
              { value: "3", label: "Technician" },
            ]}
            name="Type"
            onChange={(value) => {
              if (value !== null) {
                newRoleObject.Type = Number(value);
              } else {
                newRoleObject.Type = 2;
              }
            }}
          />
          <Button mt={15} type="submit">
            Submit
          </Button>
        </form>
      ),
    });
  };

  const openEditModal = ({ row }: any) => {
    let newObject = {
      Name: row.Name,
      Description: row.Description,
      Type: row.Type,
    };
    modals.openConfirmModal({
      title: "Edit This User",
      children: (
        <form onSubmit={(event) => event.preventDefault()}>
          <TextInput
            onChange={(e) =>
              (newObject = { ...newObject, Name: e.currentTarget.value })
            }
            label="Name"
            placeholder={row.Name}
            data-autofocus
          />
          <TextInput
            onChange={(e) =>
              (newObject = { ...newObject, Description: e.currentTarget.value })
            }
            label="Description"
            placeholder={row.Description}
          />
          <NativeSelect
            onChange={(e) =>
              (newObject = { ...newObject, Type: e.currentTarget.value })
            }
            data={["Admin", "Client", "Technician"]}
            placeholder={row.Type}
            label="Type"
          />
        </form>
      ),
      labels: { confirm: "Submit", cancel: "Cancel" },
      onCancel: () => console.log("You Cancelled"),
      onConfirm: () => {
        setDataRendered(
          dataRendered.map((item: any) =>
            item[idColumn] === row[idColumn] ? newObject : item
          )
        );

        showNotification({
          title: "Edit success!",
          message: `You've successfully edited ${row.Name}`,
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
          <Text>Are you sure you want to delete {row.name} from SIMS?</Text>
        </>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      onCancel: () => console.log("You Cancelled"),
      onConfirm: () => {
        setDataRendered([
          ...dataRendered.filter(
            (item: any) => item[idColumn] !== row[idColumn]
          ),
        ]);
        showNotification({
          title: `You have successfully deleted ${row.Name}`,
          message: "This is a future functionality",
          autoClose: 3000,
          color: "green",
        });
        console.log("You tried to delete ", row.name);
      },
    });
  };

  // END MODAL FUNCTIONS

  const handleFilter = (filterBy: string) => {
    // console.log(filterBy);
    // console.log(data);
    const filteredData = data.filter(
      (row: any) => row.organization === filterBy
    );
    // console.log(filteredData);
    setDataRendered(filteredData.slice(0, 9));
  };

  const columnStrings: string[] = columnHeadings
    ? columnHeadings
    : Object.keys(data[0]);
  const columns = columnStrings.map((heading) => (
    <th className={classes.th}>{heading}</th>
  ));

  const rows = dataRendered.map((row: any, index: any) => {
    return (
      <tr>
        <td>
          <Group noWrap>
            <Link
              state={{ data: row }}
              to={`/user/roles/permissions/${row.Name}`}
            >
              <Button variant="subtle" size="xs">
                Permissions
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
          .map((rowdata, index) => {
            return (
              <td className={classes.td} key={index}>
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
              size={25}
            >
              <Edit size={15} />
            </ActionIcon>
            <ActionIcon
              onClick={() => {
                openDeleteModal({ row });
              }}
              size={25}
            >
              <TrashX size={15} />
            </ActionIcon>
          </Group>
        </td>
      </tr>
    );
  });

  const filters = filterableHeadings ? (
    filterableHeadings.map((filter) => {
      const arrayValues: string[] = ["All"];
      data.forEach((el: any) => {
        if (arrayValues.includes(el[filter]) !== true) {
          arrayValues.push(el[filter]);
        }
      });

      return (
        <NativeSelect
          data={arrayValues}
          onChange={(e) => {
            if (e.target.value !== "All") {
              handleFilter(e.target.value);
            } else reloadData(1);
          }}
          // onChange={(event) => {
          // 	// if (event.currentTarget.value !== 'All') {
          // 	// 	changeFilter(event.currentTarget.value);
          // 	// } else reloadData(1);
          // }}
          placeholder={filter}
          label={`Filter ${filter}`}
        />
      );
    })
  ) : (
    <></>
  );

  useEffect(() => {
    setTimeout(function () {
      setLoading(false);
    }, 300);
    setDataRendered(data.slice(0, 9));
    console.log("Here: ", data);
  }, [data]);

  const reloadData = (page: number) => {
    setLoading(true);
    const lowerBound = page * 10 - 10;
    const upperBound = page * 10 - 1;
    setDataRendered(data.slice(lowerBound, upperBound));
    setLoading(false);
  };

  // const changeFilter = (query: string) => {
  // 	setLoading(true);
  // 	setDataRendered(filterData(data, query).slice(0, 9));
  // 	setLoading(false);
  // };

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
        <Group>
          {filterableHeadings ? <Group> {filters} </Group> : <></>}
          <Button onClick={openAddRoleModal}>Add Role</Button>
        </Group>
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
        <Text>
          {/* <Group>
						Showing 1 to {currentLimit} of {data.length} rows{' '}
						<NativeSelect
							data={['10', '25', '50']}
							value={currentLimit}
							placeholder={currentLimit.toString()}
							onChange={(event) => {
								setCurrentLimit(Number(event.currentTarget.value));
								console.log(event);
								console.log(currentLimit);
								setPage(1);
								reloadData(1);
							}}
						/>
						rows per page
					</Group> */}
        </Text>
        {dataRendered.length > 9 ? (
          <Pagination
            my="sm"
            page={activePage}
            onChange={(page) => {
              reloadData(page);
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

export default UserRoles;
