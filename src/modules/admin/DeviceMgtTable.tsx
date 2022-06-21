import React, { useState, useEffect } from "react";
import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  ActionIcon,
  Button,
  SimpleGrid,
  Pagination,
  Skeleton,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import {
  Selector,
  ChevronDown,
  ChevronUp,
  Edit,
  TrashX,
  Printer,
} from "tabler-icons-react";
import { useModals } from "@mantine/modals";
import { getDevices, addDevice } from "../../api/devices";
import { useForm } from "@mantine/form";
import { DatePicker, TimeInput } from "@mantine/dates";

const useStyles = createStyles((theme) => ({
  th: {
    padding: "0 !important",
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

interface RowData {
  deviceID: string;
  deviceType: string;
  deviceCode: string;
  area: string;
  level: string;
  dateDeployed: string;
  timeDeployed: string;
  dateRemoved: string;
  frequency: string;
}

interface TableSortProps {
  data: RowData[];
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

interface DeviceData {
  device_type_ID: number;
  device_code: string;
  client_location_area_ID: number;
  client_location_ID: number;
  date_deployed: Date;
  time_deployed: Date;
  date_removed: Date;
  user_ID: number;
  f_m: number;
  f_t: number;
  f_w: number;
  f_th: number;
  f_f: number;
  f_sat: number;
  f_sun: number;
  top_pos: number;
  left_pos: number;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const { classes } = useStyles();
  const Icon = sorted ? (reversed ? ChevronUp : ChevronDown) : Selector;
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text weight={500} size="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={14} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
}

function filterData(data: RowData[], search: string) {
  const keys = Object.keys(data[0]);
  const query = search.toLowerCase().trim();
  return data.filter((item: any) =>
    keys.some((key) => item[key].toLowerCase().includes(query))
  );
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData; reversed: boolean; search: string }
) {
  if (!payload.sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[payload.sortBy].localeCompare(a[payload.sortBy]);
      }

      return a[payload.sortBy].localeCompare(b[payload.sortBy]);
    }),
    payload.search
  );
}

export function DeviceMgtTable() {
  const { classes } = useStyles();
  const modals = useModals();
  const [search, setSearch] = useState("");
  const [queryData, setQueryData] = useState<TableSortProps>({ data: [] });
  const [sortedData, setSortedData] = useState<RowData[]>(queryData.data);
  const [loading, setLoading] = useState(true);
  const [activePage, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<keyof RowData>("deviceType");
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [deviceToBeAdded, setDeviceToBeAdded] = useState<DeviceData>();
  const deviceForm = useForm({
    initialValues: {
      device_type_ID: 0,
      device_code: "",
      client_location_area_ID: 0,
      client_location_ID: 0,
      date_deployed: new Date(),
      time_deployed: new Date(),
      date_removed: new Date(),
      user_ID: 0,
      f_m: 0,
      f_t: 0,
      f_w: 0,
      f_th: 0,
      f_f: 0,
      f_sat: 0,
      f_sun: 0,
      top_pos: 0,
      left_pos: 0,
    },
  });

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(
      sortData(queryData.data, { sortBy: field, reversed, search })
    );
  };

  //   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     const { value } = event.currentTarget;
  //     setSearch(value);
  //     setSortedData(
  //       sortData(queryData.data, {
  //         sortBy,
  //         reversed: reverseSortDirection,
  //         search: value,
  //       })
  //     );
  //   };

  //   const getData = async () => {
  //     const response = await getDevices(1);
  //     return response.data;
  //   };

  const encodeData = (data: Object[]) => {
    let tableData: RowData[] = [];
    data.forEach((element: any) => {
      let freqString = "";
      if (element.f_m !== 0) {
        freqString.concat("M");
      }

      if (element.f_t !== 0) {
        freqString.concat(", ", "T");
      }

      if (element.f_w !== 0) {
        freqString.concat(", ", "W");
      }

      if (element.f_th !== 0) {
        freqString.concat(", ", "Th");
      }

      if (element.f_f !== 0) {
        freqString.concat(", ", "F");
      }

      if (element.f_sat !== 0) {
        freqString.concat(", ", "Sa");
      }

      if (element.f_sun !== 0) {
        freqString.concat(", ", "Sun");
      }

      // const dateDeployed = new Date(element.date_deployed).toLocaleDateString();
      // const timeDeployed = new Date(element.time_deployed).toLocaleTimeString();
      // const dateRemoved = new Date(element.date_removed).toLocaleDateString();
      const level = element.level === null ? "" : element.level.toString();
      const area = element.client_location_ID.toString();

      const tableObject = {
        deviceID: element.device_ID.toString(),
        deviceType: element.device_type_name,
        deviceCode: element.device_code,
        area: area,
        level: level,
        dateDeployed: element.date_deployed,
        timeDeployed: element.time_deployed,
        dateRemoved: element.date_removed,
        frequency: freqString,
      };
      tableData.push(tableObject);
    });
    const tableProps: TableSortProps = {
      data: tableData,
    };

    return tableProps;
  };

  const reloadData = async (page: number) => {
    setLoading(true);
    const NewQueryData = await getDevices(page);
    const newTableData = encodeData(NewQueryData.data.data);
    setSortedData(newTableData.data);
    setQueryData(NewQueryData.data);
    setLoading(false);
  };

  // Modals for CRUD

  const openAddModal = () => {
    const addID = modals.openModal({
      title: "Add a User",
      children: (
        <form onSubmit={(event) => event.preventDefault()}>
          <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
            <TextInput
              onChange={(e) => {
                deviceForm.setFieldValue(
                  "device_type_ID",
                  Number(e.currentTarget.value)
                );
              }}
              label="Device Type"
              placeholder="Device Type"
              data-autofocus
            />
            <TextInput
              onChange={(e) => {
                deviceForm.setFieldValue("device_code", e.currentTarget.value);
              }}
              label="Device Code"
              placeholder="Device Code"
              required
            />
          </SimpleGrid>
          <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
            <TextInput
              onChange={(e) => {
                deviceForm.setFieldValue(
                  "client_location_ID",
                  Number(e.currentTarget.value)
                );
              }}
              label="Site"
              placeholder="Site"
            />
            <TextInput
              onChange={(e) => {
                deviceForm.setFieldValue(
                  "client_location_area_ID",
                  Number(e.currentTarget.value)
                );
              }}
              label="Area"
              placeholder="Area"
            />
          </SimpleGrid>
          <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
            {/* <TextInput label="Date Deployed" placeholder="Date Deployed" /> */}
            <DatePicker
              label="Date Deployed"
              placeholder="Pick date"
              onChange={(e: Date) => {
                deviceForm.setFieldValue("date_deployed", e);
              }}
              defaultValue={new Date()}
            />
            <TimeInput
              label="Time Deployed"
              placeholder="Pick time"
              onChange={(e: Date) => {
                deviceForm.setFieldValue("time_deployed", e);
              }}
              format="12"
              defaultValue={new Date()}
            />
            {/* <TextInput label="Time Deployed" placeholder="Time Deployed" /> */}
          </SimpleGrid>
          <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
            {/* <TextInput label="Date Removed" placeholder="Date Removed" /> */}
            <DatePicker
              label="Date Removed"
              placeholder="Pick date"
              onChange={(e: Date) => {
                deviceForm.setFieldValue("date_removed", e);
              }}
              defaultValue={new Date()}
            />
            {/* <TextInput label="Frequency" placeholder="Frequency" /> */}
          </SimpleGrid>
          <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
            <Button
              variant="outline"
              onClick={() => modals.closeModal(addID)}
              mt="md"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                // console.log(typeof deviceForm.values);
                // setDeviceToBeAdded(deviceForm.values);
                try {
                  addDevice(deviceForm.values);
                  modals.closeModal(addID);
                  showNotification({
                    title: "Successfully added device",
                    message: "This is a future functionality",
                    autoClose: 3000,
                    color: "green",
                  });
                } catch (err) {
                  showNotification({
                    title: "Something went wrong",
                    message: `${err}`,
                    autoClose: 3000,
                    color: "red",
                  });
                }
              }}
              mt="md"
            >
              Submit
            </Button>
          </SimpleGrid>
        </form>
      ),
    });
  };

  const openEditModal = ({ row }: any) => {
    const editID = modals.openModal({
      title: "Edit",
      children: (
        <form onSubmit={(event) => event.preventDefault()}>
          <TextInput
            label="Device Type"
            placeholder={row.deviceType}
            data-autofocus
          />
          <TextInput label="Device Code" placeholder={row.deviceCode} />

          <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
            <TextInput label="Site" placeholder="Site" />
            <TextInput label="Area" placeholder="Area" />
          </SimpleGrid>
          <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
            <TextInput label="Date Deployed" placeholder={row.dateDeployed} />
            <TextInput label="Time Deployed" placeholder={row.timeDeployed} />
          </SimpleGrid>
          <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
            <TextInput label="Date Removed" placeholder={row.dateRemoved} />
            <TextInput label="Frequency" placeholder={row.frequency} />
          </SimpleGrid>
          <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
            <Button
              variant="outline"
              onClick={() => modals.closeModal(editID)}
              mt="md"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                modals.closeModal(editID);
                showNotification({
                  title: "Edit success!",
                  message: "This is a future functionality",
                  autoClose: 3000,
                  color: "green",
                });
              }}
              mt="md"
            >
              Submit
            </Button>
          </SimpleGrid>
        </form>
      ),
    });
  };

  const openDeleteModal = ({ row }: any) => {
    const deleteID = modals.openModal({
      title: "Delete Device",
      children: (
        <>
          <Text>
            Are you sure you want to delete {row.deviceType} from SIMS?
          </Text>
          <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
            <Button
              variant="outline"
              onClick={() => modals.closeModal(deleteID)}
              mt="md"
            >
              Cancel
            </Button>
            <Button
              color="red"
              onClick={() => {
                modals.closeModal(deleteID);
                showNotification({
                  title: "Successfully deleted device",
                  message: "This is a future functionality",
                  autoClose: 3000,
                  color: "red",
                });
              }}
              mt="md"
            >
              Confirm
            </Button>
          </SimpleGrid>
        </>
      ),
    });
  };

  // End Modals for Crud
  const rows = sortedData.map((row) => (
    <tr key={row.deviceID}>
      <td>
        <Group spacing="xs" noWrap={true}>
          <ActionIcon
            onClick={() => openEditModal({ row })}
            size="sm"
            variant="light"
          >
            <Edit size={15} />
          </ActionIcon>
          <ActionIcon
            onClick={() => openDeleteModal({ row })}
            size="sm"
            variant="light"
          >
            <TrashX size={15} />
          </ActionIcon>
        </Group>
      </td>
      <td className={classes.td}>{row.deviceType}</td>
      <td className={classes.td}>{row.deviceCode}</td>
      <td className={classes.td}>{row.area}</td>
      <td className={classes.td}>{row.level}</td>
      <td className={classes.td}>{row.dateDeployed}</td>
      <td className={classes.td}>{row.timeDeployed}</td>
      <td className={classes.td}>{row.dateRemoved}</td>
      <td className={classes.td}>{row.frequency}</td>
    </tr>
  ));

  useEffect(() => {
    (async () => {
      const NewQueryData = await getDevices(1);
      const newTableData = encodeData(NewQueryData.data.data);
      setSortedData(newTableData.data);
      setQueryData(newTableData);
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <Group mb="md">
        {/* <TextInput
					placeholder="Search by any field"
					icon={<Search size={14} />}
					value={search}
					onChange={handleSearchChange}
				/> */}
        <Button
          onClick={() => {
            openAddModal();
          }}
        >
          Add
        </Button>
        <Button
          leftIcon={<Printer size={14} />}
          onClick={() => alert("Future Functionality")}
        >
          QR Codes
        </Button>
        <Button
          variant="gradient"
          gradient={{ from: "teal", to: "blue", deg: 60 }}
          leftIcon={<Printer size={14} />}
          onClick={() => alert("Future Functionality")}
        >
          Print List
        </Button>
      </Group>
      <Skeleton visible={loading}>
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
              <tr>
                <th>Action</th>
                <Th
                  sorted={sortBy === "deviceType"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("deviceType")}
                >
                  Device Type
                </Th>
                <Th
                  sorted={sortBy === "deviceCode"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("deviceCode")}
                >
                  Device Code
                </Th>
                <Th
                  sorted={sortBy === "area"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("area")}
                >
                  Area
                </Th>
                <Th
                  sorted={sortBy === "level"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("level")}
                >
                  Level
                </Th>
                <Th
                  sorted={sortBy === "dateDeployed"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("dateDeployed")}
                >
                  Date Deployed
                </Th>
                <Th
                  sorted={sortBy === "timeDeployed"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("timeDeployed")}
                >
                  Time Deployed
                </Th>
                <Th
                  sorted={sortBy === "dateRemoved"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("dateRemoved")}
                >
                  Date Removed
                </Th>
                <Th
                  sorted={sortBy === "frequency"}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting("frequency")}
                >
                  Frequency
                </Th>
              </tr>
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
      <Pagination
        my="sm"
        page={activePage}
        onChange={(page) => {
          reloadData(page);
          setPage(page);
        }}
        total={1261}
      />
    </>
  );
}
