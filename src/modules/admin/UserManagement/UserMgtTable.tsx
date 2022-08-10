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
  TextInput,
  SimpleGrid,
} from "@mantine/core";
import { Edit, TrashX, Refresh } from "tabler-icons-react";
import { useModals } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { DatePicker } from "@mantine/dates";
import { Link } from "react-router-dom";
import { addNewUser, deleteUser, editUser } from "../../../api/user";

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
  fetchUsersData: Function;
  ignoreColumn?: Array<string>;
  columnHeadings?: Array<string>;
  filterableHeadings?: Array<string>;
  actionButtons?: React.ReactNode;
}

const UserMgtTable = ({
  data,
  description,
  idColumn,
  ignoreColumn,
  actionButtons,
  fetchUsersData,
  columnHeadings,
  filterableHeadings,
}: Props) => {
  const modals = useModals();
  const { classes } = useStyles();
  const [loading, setLoading] = useState<boolean>(true);
  const [activePage, setPage] = useState<number>(1);
  const [currentLimit, setCurrentLimit] = useState<number>(10);
  const [dataRendered, setDataRendered] = useState<any>([]);

  // MODAL FUNCTIONS

  const openAddUserModal = () => {
    let newUserObject = {
      inp_name: "",
      inp_email: "",
      inp_username: "",
      inp_mobile: "",
      sex: "",
      inp_landline: "",
      inp_address: "",
      inp_org: 8,
    };

    const id = modals.openModal({
      title: "Add User",
      children: (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addNewUser(newUserObject);
            refetch();
            showNotification({
              title: `Success!`,
              message: `You have successfully added ${newUserObject.inp_name}`,
              autoClose: 3000,
              color: "green",
            });
            modals.closeModal(id);
          }}
        >
          <TextInput
            label="Name"
            name="inp_name"
            onChange={(e) => (newUserObject.inp_name = e.currentTarget.value)}
          />
          <TextInput
            label="Username"
            name="inp_username"
            onChange={(e) =>
              (newUserObject.inp_username = e.currentTarget.value)
            }
          />
          <TextInput
            label="Email"
            name="inp_email"
            onChange={(e) => (newUserObject.inp_email = e.currentTarget.value)}
          />
          <TextInput
            mb={15}
            label="Mobile"
            name="inp_mobile"
            onChange={(e) => (newUserObject.inp_mobile = e.currentTarget.value)}
          />
          <Group mt={15} noWrap grow>
            <Button
              variant="outline"
              onClick={() => {
                modals.closeModal(id);
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      ),
    });
  };

  const openEditModal = ({ row }: any) => {
    let newUserObject = {
      id: row.ID,
      inp_name: row.name,
      inp_email: row.email_add,
      inp_username: row.username,
      inp_mobile: row.mobile_no,
      sex: row.sex,
      inp_landline: row.landline,
      inp_address: row.address,
      inp_org: 8,
    };

    modals.openConfirmModal({
      title: "Edit This User",
      children: (
        <form onSubmit={(event) => event.preventDefault()}>
          <TextInput
            label="Name"
            placeholder={row.name}
            data-autofocus
            onChange={(e) => (newUserObject.inp_name = e.currentTarget.value)}
          />
          <TextInput
            label="User Name"
            placeholder={row.username}
            onChange={(e) =>
              (newUserObject.inp_username = e.currentTarget.value)
            }
          />
          <TextInput
            label="Email Address"
            placeholder={row.email_add}
            onChange={(e) => (newUserObject.inp_email = e.currentTarget.value)}
          />
          {/* <TextInput label="Organization" placeholder={row.organization} onChange={(e) => newUserObject.inp_name = e.currentTarget.value} /> */}
          <TextInput
            label="Mobile Number"
            placeholder={row.mobile_no}
            onChange={(e) => (newUserObject.inp_mobile = e.currentTarget.value)}
          />
        </form>
      ),
      labels: { confirm: "Submit", cancel: "Cancel" },
      onCancel: () => console.log("You Cancelled"),
      onConfirm: () => {
        editUser(newUserObject);
        refetch();
        showNotification({
          title: "Edit success!",
          message: "This is a future functionality",
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
          <Text>Are you sure you want to delete {row.name} from SIMS?</Text>
        </>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      onCancel: () => console.log("You Cancelled"),
      onConfirm: () => {
        deleteUser(row.ID);
        refetch();
        showNotification({
          title: `Delete successful.`,
          message: `You have successfully deleted ${row.name}`,
          autoClose: 3000,
          color: "green",
        });
      },
    });
  };

  const openResetModal = ({ row }: any) => {
    modals.openConfirmModal({
      title: "Reset User's Password",
      children: (
        <>
          <Text>Are you sure you want to reset {row.name}'s password?</Text>
        </>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      onCancel: () => console.log("You Cancelled"),
      onConfirm: () => {
        showNotification({
          title: `You have successfully reset ${row.name}'s password!`,
          message: "This is a future functionality",
          autoClose: 3000,
          color: "green",
        });
        console.log("You reset their password: ", row.name);
      },
    });
  };

  // END MODAL FUNCTIONS

  // FETCH FUNCTIONS

  const refetch = async () => {
    fetchUsersData();
    setPage(1);
    reloadData(1);
  };

  // TABLE DATA CONTENTS

  const handleFilter = (filterBy: string) => {
    const filteredData = data.filter(
      (row: any) => row.Organization === filterBy
    );
    setDataRendered(filteredData.slice(0, 9));
  };

  const columnStrings: string[] = columnHeadings
    ? columnHeadings
    : Object.keys(data[0]);
  const columns = columnStrings.map((heading) => (
    <th className={classes.th}>{heading}</th>
  ));

  const rows = dataRendered.map((row: any, index: number) => {
    return (
      <tr key={index}>
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
          .map((rowdata, index) => {
            if (row[rowdata] === null) {
              return <td key={index}>-</td>;
            }
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
            {/* <ActionIcon
              onClick={() => {
                openResetModal({ row });
              }}
              size={25}
            >
              <Refresh size={15} />
            </ActionIcon> */}
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

  // END TABLE DATA CONTENTS

  useEffect(() => {
    setTimeout(function () {
      setLoading(false);
    }, 300);
    if (data.length > 0) {
      setDataRendered(data.slice(0, 10));
    }
  }, [data]);

  const reloadData = (page: number) => {
    setLoading(true);
    const lowerBound = page * 10 - 10;
    const upperBound = page * 10;
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
          {filterableHeadings ? (
            <Group align="end">
              {filters}
              <Button onClick={openAddUserModal}>Add User</Button>
            </Group>
          ) : (
            <></>
          )}
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
        {data.length > 10 ? (
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

export default UserMgtTable;
