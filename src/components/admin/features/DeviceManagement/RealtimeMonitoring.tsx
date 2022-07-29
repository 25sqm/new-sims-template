import React, { useEffect, useState } from "react";

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
import {
  getDeviceIdentification,
  getRealtimeMonitoringInfo,
} from "../../../../api/devices";

const RealtimeMonitoring = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  async function fetchRealtimeMonitoring() {
    const data = await getRealtimeMonitoringInfo();
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
    fetchRealtimeMonitoring();
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
        Realtime Device Monitoring
      </Title>
      <Paper shadow="md" p="sm" my="md" sx={{ height: "auto" }}>
        <MonitoringTable
          data={data}
          fetchRealtimeMonitoring={fetchRealtimeMonitoring}
          idColumn={"area_monitoring_ID"}
          ignoreColumn={["actionbtn", "id", "report"]}
          columnHeadings={[
            "Item ID",
            "Service Order",
            "Area",
            "Device Code",
            "Condition",
            "Activity",
            "Image",
            "Timestamp",
          ]}
          filterableHeadings={["area", "condition"]}
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
  fetchRealtimeMonitoring: Function;
  ignoreColumn?: Array<string>;
  columnHeadings?: Array<string>;
  filterableHeadings?: Array<string>;
  actionButtons?: React.ReactNode;
}

const MonitoringTable = ({
  data,
  description,
  idColumn,
  ignoreColumn,
  actionButtons,
  fetchRealtimeMonitoring,
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
    fetchRealtimeMonitoring();
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

  return (
    <>
      <Skeleton visible={loading}>
        {description ? <Text size="xl">{description}</Text> : <></>}
        <Group>{filterableHeadings ? <>{filters}</> : <></>}</Group>
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

export default RealtimeMonitoring;
