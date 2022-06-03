import React, { useState, useEffect } from 'react';
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
  Pagination
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { Selector, ChevronDown, ChevronUp, Search, Edit, TrashX, Printer } from 'tabler-icons-react';
import { useModals } from '@mantine/modals';
import { getDevices } from '../../api/devices';


const useStyles = createStyles((theme) => ({
  th: {
    padding: '0 !important',
  },
  
  td: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
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
  deviceID: string,
  deviceType: string,
  deviceCode: string,
  area: string,
  level: string,
  dateDeployed: string,
  timeDeployed: string,
  dateRemoved: string,
  frequency: string
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

export function DeviceMgtTable({ data }: TableSortProps) {
  const { classes } = useStyles();
  const modals = useModals();
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(data);

  const [sortBy, setSortBy] = useState<keyof RowData>("deviceType");
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
  
   // Modals for CRUD
  
   const openAddModal = ( ) => {
    const addID = modals.openModal({
      title: 'Add a User',
      children: (
        <form onSubmit={(event) => event.preventDefault()}>
          <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
            <TextInput label="Device Type" placeholder="Device Type" data-autofocus />
            <TextInput label="Device Code" placeholder="Device Code" />
          </SimpleGrid>
          <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
            <TextInput label="Site" placeholder="Site" />
            <TextInput label="Area" placeholder="Area" />
          </SimpleGrid>
          <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
            <TextInput label="Date Deployed" placeholder="Date Deployed" />
            <TextInput label="Time Deployed" placeholder="Time Deployed" />
          </SimpleGrid>
          <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
            <TextInput label="Date Removed" placeholder="Date Removed" />
            <TextInput label="Frequency" placeholder="Frequency" />
          </SimpleGrid>
          <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
            <Button variant='outline' onClick={() => modals.closeModal(addID)} mt="md">
              Cancel
            </Button>
                  <Button onClick={() => {
                      modals.closeModal(addID)
                      showNotification({
                        title: 'Successfully added device',
                        message: 'This is a future functionality',
                        autoClose: 3000,
                        color: 'green',
                      })
                  }} mt="md">
              Submit
            </Button>
          </SimpleGrid>
          
        </form>
      ),
    });
  };
  
  const openEditModal = ({row}: any) => {
    const editID = modals.openModal({
      title: 'Edit',
      children: (
        <form onSubmit={(event) => event.preventDefault()}>
          
        <TextInput label="Device Type" placeholder={row.deviceType} data-autofocus />
         <TextInput label="Device Code" placeholder={row.deviceCode} />
          
          <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
            <TextInput label="Site" placeholder="Site" />
            <TextInput label="Area" placeholder="Area" />
          </SimpleGrid>
          <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
            <TextInput label="Date Deployed" placeholder={row.dateDeployed} />
            <TextInput label="Time Deployed" placeholder={row.timeDeployed} />
          </SimpleGrid>
          <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
            <TextInput label="Date Removed" placeholder={row.dateRemoved} />
            <TextInput label="Frequency" placeholder={row.frequency} />
          </SimpleGrid>
          <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
            <Button variant='outline' onClick={() => modals.closeModal(editID)} mt="md">
              Cancel
            </Button>
                  <Button onClick={() => {
                      modals.closeModal(editID)
                      showNotification({
                        title: 'Edit success!',
                        message: 'This is a future functionality',
                        autoClose: 3000,
                        color: 'green',
                      })
                  }} mt="md">
              Submit
            </Button>
          </SimpleGrid>
          
        </form>
      ),
    });
  };



  const openDeleteModal = ({ row }: any) => {
    const deleteID = modals.openModal({
      title: 'Delete Device',
      children: (
          <>
          <Text>Are you sure you want to delete {row.deviceType} from SIMS?</Text>
          <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
            <Button variant='outline' onClick={() => modals.closeModal(deleteID)} mt="md">
              Cancel
            </Button>
                  <Button color="red" onClick={() => {
                      modals.closeModal(deleteID)
                      showNotification({
                        title: 'Successfully deleted device',
                        message: 'This is a future functionality',
                        autoClose: 3000,
                        color: 'red',
                      })
                  }} mt="md">
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
          <ActionIcon onClick={() => openEditModal({row})} size="sm" variant="light"><Edit size={15} /></ActionIcon>
          <ActionIcon onClick={() => openDeleteModal({row})} size="sm" variant="light"><TrashX size={15} /></ActionIcon>
        </Group>
      </td>
      <td className={classes.td} >{row.deviceType}</td>
      <td className={classes.td} >{row.deviceCode}</td>
      <td className={classes.td} >{row.area}</td>
      <td className={classes.td} >{row.level}</td>
      <td className={classes.td} >{row.dateDeployed}</td>
      <td className={classes.td} >{row.timeDeployed}</td>
      <td className={classes.td} >{row.dateRemoved}</td>
      <td className={classes.td} >{row.frequency}</td>
    </tr>
  ));

//   // 
//   useEffect(() => {
//     (async () => {
//       try {
//         const response: TableSortProps = await getDevices(1);
//         setQueryData(response.data);
//         setSortedData(queryData);
//         console.log(queryData)
//       } catch (err) {
//         console.error(err);
//       }
//     })();
//   }, [])
// // 
  return (
    <>
      <Group mb="md">
      <TextInput
        placeholder="Search by any field"
          icon={<Search size={14} />}
        value={search}
        onChange={handleSearchChange}
        />
      <Button onClick={() => { openAddModal() }}>Add</Button>
      <Button leftIcon={<Printer size={14} />} onClick={() => alert('Future Functionality')} >QR Codes</Button>
      <Button variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 60 }} leftIcon={<Printer size={14} />} onClick={() => alert('Future Functionality')} >Print List</Button>
    </Group>
    <ScrollArea sx={{ height: 'auto' }}>
        <Table
          fontSize={12}
        horizontalSpacing="md"
              verticalSpacing="xs"
              striped
              highlightOnHover
        sx={{ tableLayout: 'auto', minWidth: 700 }}
      >
        <thead>
            <tr>
              <th>
                Action
              </th>
            <Th
              sorted={sortBy === 'deviceType'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('deviceType')}
            >
              Device Type
            </Th>
            <Th
              sorted={sortBy === 'deviceCode'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('deviceCode')}
            >
              Device Code
            </Th>
            <Th
              sorted={sortBy === 'area'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('area')}
            >
              Area
            </Th>
            <Th
              sorted={sortBy === 'level'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('level')}
            >
              Level
            </Th>
            <Th
              sorted={sortBy === 'dateDeployed'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('dateDeployed')}
            >
              Date Deployed
            </Th>
            <Th
              sorted={sortBy === 'timeDeployed'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('timeDeployed')}
            >
              Time Deployed
            </Th>
            <Th
              sorted={sortBy === 'dateRemoved'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('dateRemoved')}
            >
              Date Removed
            </Th>
            <Th
              sorted={sortBy === 'frequency'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('frequency')}
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
      </>
  );
}