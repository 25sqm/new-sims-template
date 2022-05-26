import React, { useState } from 'react';
import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
} from '@mantine/core';
import { Selector, ChevronDown, ChevronUp, Search } from 'tabler-icons-react';



const useStyles = createStyles((theme) => ({
  th: {
    padding: '0 !important',
  },

  control: {
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  icon: {
    width: 21,
    height: 21,
    borderRadius: 21,
  },
}));

interface RowData {
    name: string;
    birthday: string;
    sex: string;
    username: string;
    emailAddress: string;
    mobileNumber: string;
    landline: string;
    address: string;
    organization: string;
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
  return data.filter((item: any) => keys.some((key) => item[key].toLowerCase().includes(query)));
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

export function UserMgtTable({ data }: TableSortProps) {
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof RowData>("name");
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
  };

  const rows = sortedData.map((row) => (
    <tr key={row.name}>
      <td>{row.name}</td>
      <td>{row.birthday}</td>
      <td>{row.sex}</td>
      <td>{row.username}</td>
      <td>{row.emailAddress}</td>
      <td>{row.mobileNumber}</td>
      <td>{row.landline}</td>
      <td>{row.address}</td>
      <td>{row.organization}</td>
    </tr>
  ));

  return (
    <>
    <TextInput
        placeholder="Search by any field"
        mb="md"
        icon={<Search size={14} />}
        value={search}
        onChange={handleSearchChange}
      />
    <ScrollArea sx={{ height: '70vh' }}>
      <Table
        horizontalSpacing="md"
              verticalSpacing="xs"
              striped
              highlightOnHover
        sx={{ tableLayout: 'auto', minWidth: '110%' }}
      >
        <thead>
          <tr>
            <Th
              sorted={sortBy === 'name'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('name')}
            >
              Name
            </Th>
            <Th
              sorted={sortBy === 'birthday'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('birthday')}
            >
              Birthday
            </Th>
            <Th
              sorted={sortBy === 'sex'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('sex')}
            >
              Sex
            </Th>
            <Th
              sorted={sortBy === 'username'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('username')}
            >
              Username
            </Th>
            <Th
              sorted={sortBy === 'emailAddress'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('emailAddress')}
            >
              Email Address
            </Th>
            <Th
              sorted={sortBy === 'mobileNumber'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('mobileNumber')}
            >
              Mobile Number
            </Th>
            <Th
              sorted={sortBy === 'landline'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('landline')}
            >
              Landline
            </Th>
            <Th
              sorted={sortBy === 'address'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('address')}
            >
              Address
            </Th>
            <Th
              sorted={sortBy === 'organization'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('organization')}
            >
              Organization
            </Th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <td colSpan={Object.keys(data[0]).length}>
                <Text weight={500} align="center">
                  Nothing found
                </Text>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      </ScrollArea>
      </>
  );
}