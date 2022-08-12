import React, { useEffect, useState } from "react";

import {
  Text,
  Paper,
  Divider,
  Title,
  createStyles,
  Group,
  Button,
  ActionIcon,
  NativeSelect,
  Select,
  Skeleton,
  ScrollArea,
  Table,
  Pagination,
} from "@mantine/core";
import { serviceOrders } from "../../dummyData";
import {
  addServiceOrder,
  deleteServiceOrder,
  editServiceOrder,
  getServiceOrders,
  getServiceTypes,
  getSites,
} from "../../../../api/service-orders";
import { useModals } from "@mantine/modals";
import { Link } from "react-router-dom";
import { Edit, TrashX } from "tabler-icons-react";
import { showNotification } from "@mantine/notifications";
import { DatePicker, TimeInput } from "@mantine/dates";
import { getUsersInfo } from "../../../../api/user";
import { type } from "os";

const ServiceManagement = () => {
  const [serviceOrders, setServiceOrders] = useState<any>([]);
  const [serviceTypes, setServiceTypes] = useState<any>([]);
  const [staff, setStaff] = useState<any>([]);
  const [sites, setSites] = useState<any>([]);

  const fetchServiceOrders = async () => {
    const response = await getServiceOrders();
    setServiceOrders(response.data);
  };

  const dropdownsPopulate = async () => {
    const serviceTypesResponse = await getServiceTypes();
    const sitesResponse = await getSites();
    const staffResponse = await getUsersInfo();

    const types = serviceTypesResponse.data.map((type: any) => {
      return { value: type.service_type_ID, label: type.service_type_name };
    });
    const uniqueSites = sitesResponse.data.map((site: any) => {
      return {
        value: site.client_location_ID,
        label: site.client_location_name,
      };
    });
    const uniqueStaff = staffResponse.data.map((staff: any) => {
      return { value: staff.ID, label: staff.name };
    });
    setServiceTypes(types);
    setStaff(uniqueStaff);
    setSites(uniqueSites);
  };

  useEffect(() => {
    fetchServiceOrders();
    dropdownsPopulate();
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
        Service Orders
      </Title>
      <Paper shadow="md" p="sm" my="md" sx={{ height: "auto" }}>
        <ServiceOrdersTable
          data={serviceOrders}
          idColumn={"ref_no"}
          ignoreColumn={["actionbtn", "id"]}
          fetchServiceOrders={fetchServiceOrders}
          serviceTypes={serviceTypes}
          staff={staff}
          sites={sites}
          columnHeadings={[
            "",
            "Ref No",
            "Service Type",
            "Location",
            "Staff",
            "Date",
            "Time",
            "End Time",
            "Status",
            "Action",
          ]}
          filterableHeadings={["location", "service_type"]}
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
  fetchServiceOrders: Function;
  serviceTypes: Array<{ value: string; label: string }>;
  staff: Array<{ value: string; label: string }>;
  sites: Array<{ value: string; label: string }>;
  actionButtons?: React.ReactNode;
}

// const filterData = (data: Array<Object>, filterQuery: string) => {
// 	const keys = Object.keys(data[0]);
// 	const query = filterQuery.toLowerCase().trim();
// 	return data.filter((item: any) =>
// 		keys.some(
// 			(key: any) =>
// 				typeof item[key] === 'string' &&
// 				item[key].toLowerCase().includes(query),
// 		),
// 	);
// };

const ServiceOrdersTable = ({
  data,
  description,
  idColumn,
  ignoreColumn,
  actionButtons,
  columnHeadings,
  filterableHeadings,
  serviceTypes,
  staff,
  sites,
  fetchServiceOrders,
}: Props) => {
  const modals = useModals();
  const { classes } = useStyles();
  const [loading, setLoading] = useState<boolean>(true);
  const [activePage, setPage] = useState<number>(1);
  const [currentLimit, setCurrentLimit] = useState<number>(10);
  const [dataRendered, setDataRendered] = useState<any>([]);

  const refetch = () => {
    fetchServiceOrders();
    setPage(1);
    reloadData(1);
  };

  const columnStrings: string[] = columnHeadings
    ? columnHeadings
    : Object.keys(data[0]);
  const columns = columnStrings.map((heading) => (
    <th className={classes.th}>{heading}</th>
  ));

  const rows = dataRendered.map((row: any, index: number) => {
    const unique = index;
    return (
      <tr key={unique}>
        <td>
          <Group noWrap>
            <Link state={{ data: row }} to={`/service-tasks/${row.ref_no}`}>
              <Button variant="subtle" size="xs">
                Tasks
              </Button>
            </Link>
            <Link state={{ data: row }} to={`/service-areas/${row.ref_no}`}>
              <Button variant="subtle" size="xs">
                Areas
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
                openEditServiceOrder({ row });
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

  const filters = filterableHeadings ? (
    filterableHeadings.map((filter) => {
      const arrayValues: string[] = ["All"];
      if (data.length > 0) {
        data.forEach((el: any) => {
          if (arrayValues.includes(el[filter]) !== true) {
            arrayValues.push(el[filter]);
          }
        });
      }

      return (
        <NativeSelect
          data={arrayValues}
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
      if (data.length > 0) {
        setDataRendered(data.slice(0, 9));
      }
      setLoading(false);
    }, 300);
  }, [data]);

  const reloadData = (page: number) => {
    setLoading(true);
    const lowerBound = page * 10 - 10;
    const upperBound = page * 10 - 1;
    setDataRendered(data.slice(lowerBound, upperBound));
    setLoading(false);
  };

  const openAddServiceOrder = () => {
    let startTime = "";
    let endTime = "";
    const id = modals.openModal({
      title: "Add Service Order",
      children: (
        <form
          onSubmit={(e: any) => {
            e.preventDefault();
            console.log("Form Value: ", e);
            const formData = new FormData(e.target);
            const inputObject = Object.fromEntries(formData);
            inputObject.inp_timestart = startTime;
            inputObject.inp_timeend = endTime;
            // console.table(inputObject);
            addServiceOrder(inputObject);
            refetch();
            showNotification({
              title: `Success!`,
              message: `Service order added`,
              autoClose: 3000,
              color: "green",
            });
            modals.closeModal(id);
          }}
        >
          <Select
            label="Service Type"
            name="service_type"
            required
            placeholder="Select your service type"
            data={serviceTypes}
          />
          <Select
            label="Site"
            name="inp_area"
            required
            placeholder="Select your site"
            data={sites}
          />
          <DatePicker
            placeholder="Pick Date"
            name="inp_date"
            label="Date"
            inputFormat="YYYY-MM-DD"
            required
          />
          <TimeInput
            label="Time Start"
            format="12"
            name="inp_timestart"
            defaultValue={null}
            onChange={(e: any) => {
              startTime = e.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              });
            }}
            required
          />
          <TimeInput
            label="Time End"
            format="12"
            name="inp_timeend"
            defaultValue={null}
            onChange={(e: any) => {
              endTime = e.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              });
            }}
            required
          />
          <Select
            label="Staff"
            name="inp_user"
            required
            placeholder="Select user"
            data={staff}
          />
          <Group noWrap grow mt={15}>
            <Button
              onClick={() => {
                modals.closeModal(id);
              }}
              variant="outline"
            >
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      ),
    });
  };

  const openEditServiceOrder = ({ row }: any) => {
    let startTime = row.inp_timestart;
    let endTime = row.inp_timeend;
    const id = modals.openModal({
      title: "Edit Service Order",
      children: (
        <form
          onSubmit={(e: any) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const inputObject = Object.fromEntries(formData);
            inputObject.inp_timestart = startTime;
            inputObject.inp_timeend = endTime;
            inputObject.id = row.id;
            editServiceOrder(inputObject);
            refetch();
            showNotification({
              title: `Success!`,
              message: `Service order edited`,
              autoClose: 3000,
              color: "green",
            });
            modals.closeModal(id);
          }}
        >
          <Select
            label="Service Type"
            name="service_type"
            required
            placeholder="Select your service type"
            data={serviceTypes}
          />
          <Select
            label="Site"
            name="site"
            required
            placeholder="Select your site"
            data={sites}
          />
          <DatePicker
            defaultValue={new Date(row.inp_date)}
            name="date"
            label="Date"
            required
            onChange={(date) => {
              console.log(date);
            }}
          />
          <TimeInput
            label="Time Start"
            format="12"
            name="time_start"
            defaultValue={new Date(row.inp_timestart)}
            placeholder={row.inp_timestart}
            required
            onChange={(time) => {
              startTime = time.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              });
            }}
          />
          <TimeInput
            label="Time End"
            format="12"
            name="time_end"
            defaultValue={new Date(row.inp_timeend)}
            placeholder={row.inp_timeend}
            required
            onChange={(time) => {
              endTime = time.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              });
            }}
          />
          <Select
            label="Staff"
            name="staff"
            required
            placeholder="Select user"
            data={staff}
          />
          <Group noWrap grow mt={15}>
            <Button
              onClick={() => {
                modals.closeModal(id);
              }}
              variant="outline"
            >
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      ),
    });
  };

  const openDeleteModal = ({ row }: any) => {
    modals.openConfirmModal({
      title: "Delete Service Order",
      children: (
        <>
          <Text>
            Are you sure you want to delete "{row.service_type}" role from{" "}
            {row.location}?
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
        deleteServiceOrder(row.id);
        refetch();
        showNotification({
          title: `Success!`,
          message: "You have successfully deleted a service order",
          autoClose: 3000,
          color: "green",
        });
      },
    });
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
              <Button onClick={openAddServiceOrder}>New Service Order</Button>
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
                  <td colSpan={10}>
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

export default ServiceManagement;
