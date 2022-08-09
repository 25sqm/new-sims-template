import React, { useEffect, useState } from "react";
import { DatePicker, TimeInput } from "@mantine/dates";
import { showNotification } from "@mantine/notifications";

import {
  Title,
  Text,
  Paper,
  Divider,
  Table,
  Tabs,
  Group,
  NativeSelect,
  TextInput,
  Button,
  LoadingOverlay,
  Container,
  Image,
  createStyles,
  ActionIcon,
  Skeleton,
  ScrollArea,
  Pagination,
  Tooltip,
  Select,
  MultiSelect,
} from "@mantine/core";
import { useModals } from "@mantine/modals";
import {
  Eye,
  Edit,
  Trash,
  Report,
  Map2,
  FileExport,
  TrashX,
} from "tabler-icons-react";
import { getDeviceIdentification } from "../../../../api/devices";

const DeviceInformation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  async function fetchDeviceIdentification() {
    const data = await getDeviceIdentification();
    if (data === null) {
      showNotification({
        message: "Something went wrong. Please try again later.",
        color: "red",
      });
    } else {
      setData(data.data);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    fetchDeviceIdentification();
    setIsLoading(false);
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
        Device Information
      </Title>
      <Paper shadow="md" p="sm" my="md" sx={{ height: "auto" }}>
        <DeviceInfoTable
          data={data}
          fetchDeviceIdentification={fetchDeviceIdentification}
          idColumn={"area_monitoring_ID"}
          ignoreColumn={["actionbtn", "id", "report"]}
          columnHeadings={[
            "Device Code",
            "Device Type",
            "Area",
            "Level",
            "Date Deployed",
            "Time Deployed",
            "Date Removed",
            "Frequency",
            "Action",
          ]}
          //   filterableHeadings={["area", "status"]}
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
  fetchDeviceIdentification: Function;
  ignoreColumn?: Array<string>;
  columnHeadings?: Array<string>;
  filterableHeadings?: Array<string>;
  actionButtons?: React.ReactNode;
}

const DeviceInfoTable = ({
  data,
  description,
  idColumn,
  ignoreColumn,
  actionButtons,
  fetchDeviceIdentification,
  columnHeadings,
  filterableHeadings,
}: Props) => {
  const modals = useModals();
  const { classes } = useStyles();
  const [loading, setLoading] = useState<boolean>(true);
  const [activePage, setPage] = useState<number>(1);
  const [currentLimit, setCurrentLimit] = useState<number>(10);
  const [dataRendered, setDataRendered] = useState<any>([]);

  // FETCH FUNCTIONS

  const refetch = async () => {
    fetchDeviceIdentification();
    setPage(1);
    reloadData(1);
  };

  // TABLE DATA CONTENTS

  const handleFilter = (filterBy: string) => {
    const filteredData = data.filter((row: any) => row.area === filterBy);
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
            <Tooltip label="View Map">
              <ActionIcon size={25}>
                <Map2 size={15} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Edit">
              <ActionIcon size={25}>
                <Edit size={15} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Delete">
              <ActionIcon size={25}>
                <TrashX size={15} />
              </ActionIcon>
            </Tooltip>
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

  const openAddDeviceModal = () => {
    console.log(dataRendered);
    let addDeviceObject = {
      device_type: null,
      device_code: "",
      device_site: "",
      device_area: "",
      date_deployed: "",
      time_deployed: "",
      date_removed: "",
      frequency: "",
    };

    let freqArray: string[] = [];

    modals.openConfirmModal({
      title: "Add Role",
      children: (
        <>
          <Select
            placeholder="Select Role"
            onChange={(value) => console.log(value)}
            data={[
              { value: "1", label: "Bird Scare" },
              { value: "2", label: "Bird Siren" },
              { value: "3", label: "Cage Trap (Big)" },
              { value: "4", label: "Cage Trap (Mini)" },
            ]}
            label="Role"
          />
          <TextInput
            label="Device Code"
            placeholder="Your device's code"
            name="device_code"
          />
          <Select
            placeholder="Select Site"
            onChange={(value) => console.log(value)}
            data={[
              { value: "1", label: "Bird Scare" },
              { value: "2", label: "Bird Siren" },
              { value: "3", label: "Cage Trap (Big)" },
              { value: "4", label: "Cage Trap (Mini)" },
            ]}
            label="Site"
          />
          <Select
            placeholder="Select Area"
            onChange={(value) => console.log(value)}
            data={[
              { value: "1", label: "Bird Scare" },
              { value: "2", label: "Bird Siren" },
              { value: "3", label: "Cage Trap (Big)" },
              { value: "4", label: "Cage Trap (Mini)" },
            ]}
            label="Area"
          />
          <DatePicker placeholder="Pick Date" label="Date Depoloyed" required />
          <TimeInput
            label="Time Deployed"
            format="12"
            defaultValue={new Date()}
            required
          />
          <DatePicker placeholder="Pick Date" label="Date Removed" required />
          <MultiSelect
            data={[
              { value: "M", label: "Monday" },
              { value: "T", label: "Tuesday" },
              { value: "W", label: "Wednesday" },
              { value: "TH", label: "Thursday" },
              { value: "F", label: "Friday" },
            ]}
            label="Frequency"
            onChange={(value) => {
              freqArray = value;
            }}
            placeholder="Pick days of frequency"
          />
        </>
      ),
      labels: { confirm: "Add Device", cancel: "Cancel" },
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
        // addUserAccess(userID, addModalRole);
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

  return (
    <>
      <Skeleton visible={loading}>
        {description ? <Text size="xl">{description}</Text> : <></>}
        <Group align="end">
          {filterableHeadings ? { filters } : <></>}
          <Button onClick={openAddDeviceModal}>Add Device</Button>
          <Button leftIcon={<FileExport size={20} />}>Export</Button>
          <Button>Area Monitoring PDF</Button>
          <Button>Area Monitoring Excel</Button>
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
                  <td colSpan={12}>
                    <Text color="dimmed" size="sm" align="center">
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

export default DeviceInformation;
