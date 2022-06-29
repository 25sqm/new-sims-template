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
} from "@mantine/core";

import { Edit, TrashX, CirclePlus } from "tabler-icons-react";

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
// const data = [
//   {
//     name: "Vivay Supervisor Test",
//   },
//   {
//     name: "Vivay Salazar",
//   },
//   {
//     name: "URC Dionelle Panopio",
//   },
//   {
//     name: "System Administrator",
//   },
//   {
//     name: "Sterix Client",
//   },
//   {
//     name: "Stella Marie Batalla",
//   },
//   {
//     name: "SB Tech",
//   },
//   {
//     name: "Ronald Abrera",
//   },
//   {
//     name: "Rolando Tolentino",
//   },
//   {
//     name: "Reynaldo Sillo Jr.",
//   },
//   {
//     name: "Reynaldo Lacebal",
//   },
// ];

interface Props {
  data: Array<{
    clientID: string;
    name: string;
    sites: Array<{ siteName: string; id: string }>;
  }>;
  description?: string;
  idColumn: string;
  ignoreColumn?: Array<string>;
  columnHeadings?: Array<string>;
  testLog?: (message: any) => void;
}

const ClientSitesTable = ({
  data,
  description,
  idColumn,
  ignoreColumn,
  columnHeadings,
}: Props) => {
  const { classes } = useStyles();
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState(data[0].name);
  const [activePage, setPage] = useState<number>(1);
  const [currentLimit, setCurrentLimit] = useState<number>(10);
  const [dataRendered, setDataRendered] = useState(data[0].sites);

  useEffect(() => {
    setTimeout(function () {
      setLoading(false);
    }, 300);
  }, []);
  // const reloadData = (page: number) => {
  //   setLoading(true);
  //   const lowerBound = page * 10 - 10;
  //   const upperBound = page * 10 - 1;
  //   setDataRendered(data.slice(lowerBound, upperBound));
  //   setLoading(false);
  // };

  const reloadData = () => {
    setLoading(true);
    const current = data.find((o) => o.name === user);
    console.log(current);
    if (current !== undefined) {
      setDataRendered(current.sites);
    } else setDataRendered([]);
    setLoading(false);
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
            <ActionIcon>
              <Edit size={15} />
            </ActionIcon>
            <ActionIcon>
              <TrashX size={15} />
            </ActionIcon>
          </Group>
        </td>
      </tr>
    );
  });

  const users: Array<string> = [];
  data.forEach((user: any) => {
    users.push(user.name);
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
        <Group align="flex-end">
          <NativeSelect
            label="Select Client"
            data={users}
            value={user}
            onChange={(e) => {
              setUser(e.currentTarget.value);
              console.log("set user to: " + user);
              reloadData();
            }}
          />
          <Button leftIcon={<CirclePlus />}>Add</Button>
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

export default ClientSitesTable;
