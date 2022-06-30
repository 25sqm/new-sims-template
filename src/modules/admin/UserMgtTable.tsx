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

interface ActionButton {
  content: string;
  buttonNode: React.ReactNode;
}

interface Props {
  data: Array<Object>;
  description?: string;
  idColumn: string;
  ignoreColumn?: Array<string>;
  columnHeadings?: Array<string>;
  filterableHeadings?: Array<string>;
  actionButtons?: React.ReactNode;
}

const UserMgtTable = (
  {
    data,
    description,
    idColumn,
    ignoreColumn,
    actionButtons,
    columnHeadings,
    filterableHeadings,
  }: Props,
  { testEdit, testDelete }: any
) => {
  const modals = useModals();
  const { classes } = useStyles();
  const [loading, setLoading] = useState<boolean>(true);
  const [activePage, setPage] = useState<number>(1);
  const [currentLimit, setCurrentLimit] = useState<number>(10);
  const [dataRendered, setDataRendered] = useState(data.slice(0, 9));

  // MODAL FUNCTIONS

  const openEditModal = ({ row }: any) => {
    modals.openConfirmModal({
      title: "Edit This User",
      children: (
        <form onSubmit={(event) => event.preventDefault()}>
          <TextInput label="Name" placeholder={row.name} data-autofocus />
          <TextInput label="User Name" placeholder={row.username} />
          <TextInput label="Email Address" placeholder={row.emailAddress} />
          <TextInput label="Organization" placeholder={row.organization} />
          <TextInput label="Address" placeholder={row.address} />
          <DatePicker label="Birthday" value={new Date(row.birthday)} />
          <NativeSelect data={["M", "F"]} placeholder={row.sex} label="Sex" />
          <TextInput label="Landline" placeholder={row.landline} />
          <TextInput label="Mobile Number" placeholder={row.mobileNumber} />
        </form>
      ),
      labels: { confirm: "Submit", cancel: "Cancel" },
      onCancel: () => console.log("You Cancelled"),
      onConfirm: () => {
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
          <Text>Are you sure you want to delete {row.name} from SIMS?</Text>
        </>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      onCancel: () => console.log("You Cancelled"),
      onConfirm: () => {
        showNotification({
          title: `You have successfully deleted ${row.name}`,
          message: "This is a future functionality",
          autoClose: 3000,
          color: "green",
        });
        console.log("You tried to delete ", row.name);
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

  const rows = dataRendered.map((row: any, index) => {
    const unique = index;
    return (
      <tr key={unique}>
        <td>
          <Group noWrap>
            <Button variant="subtle" size="xs">
              Access
            </Button>
            <Button variant="subtle" size="xs">
              Sites
            </Button>
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
              size={25}
            >
              <Edit size={15} />
            </ActionIcon>
            <ActionIcon
              onClick={() => {
                openResetModal({ row });
              }}
              size={25}
            >
              <Refresh size={15} />
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
  }, []);

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
        <Group>{filterableHeadings ? <Group> {filters} </Group> : <></>}</Group>
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
                    <Text weight={500} align="center">
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

export default UserMgtTable;
