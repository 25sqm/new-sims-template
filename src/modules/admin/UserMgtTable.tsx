import React, { useState } from "react";
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
  Anchor,
  Button,
  SimpleGrid,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import {
  Selector,
  ChevronDown,
  ChevronUp,
  Search,
  Refresh,
  Edit,
  TrashX,
} from "tabler-icons-react";
import { useModals } from "@mantine/modals";

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
        <Group position="apart" noWrap>
          <Text weight={500} size="xs" style={{ whiteSpace: "nowrap" }}>
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={12} />
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

export function UserMgtTable({ data }: TableSortProps) {
  const { classes } = useStyles();
  const modals = useModals();
  const [search, setSearch] = useState("");
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
    setSortedData(
      sortData(data, { sortBy, reversed: reverseSortDirection, search: value })
    );
  };

  // Modals for CRUD

  const openAddModal = () => {
    const addID = modals.openModal({
      title: "Add a User",
      children: (
        <form onSubmit={(event) => event.preventDefault()}>
          <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
            <TextInput label="Name" placeholder="Name" data-autofocus />
            <TextInput label="Birthday" placeholder="Birthday" />
          </SimpleGrid>
          <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
            <TextInput label="Sex" placeholder="Sex" />
            <TextInput label="Username" placeholder="Username" />
          </SimpleGrid>

          <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
            <TextInput label="Email Address" placeholder="Email Address" />
            <TextInput label="Mobile Number" placeholder="Mobile Number" />
          </SimpleGrid>
          <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
            <TextInput label="Landline" placeholder="Landline" />
            <TextInput label="Address" placeholder="Address" />
          </SimpleGrid>
          <TextInput label="Organization" placeholder="Organization" />
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
                modals.closeModal(addID);
                showNotification({
                  title: "Successfully added a new user",
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

  const openEditModal = ({ row }: any) => {
    const editID = modals.openModal({
      title: "Edit",
      children: (
        <form onSubmit={(event) => event.preventDefault()}>
          <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
            <TextInput label="Name" placeholder={row.name} data-autofocus />
            <TextInput label="Birthday" placeholder={row.birthday} />
          </SimpleGrid>
          <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
            <TextInput label="Sex" placeholder={row.sex} />
            <TextInput label="Username" placeholder={row.username} />
          </SimpleGrid>
          <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
            <TextInput label="Email Address" placeholder={row.emailAddress} />
            <TextInput label="Mobile Number" placeholder={row.mobileNumber} />
          </SimpleGrid>
          <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
            <TextInput label="Landline" placeholder={row.landline} />
            <TextInput label="Address" placeholder={row.address} />
          </SimpleGrid>
          <TextInput label="Organization" placeholder={row.organization} />
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

  const openResetModal = ({ row }: any) => {
    const resetID = modals.openModal({
      title: "Reset Password",
      children: (
        <>
          <Text>
            Are you sure you want to reset the password for {row.name}?
          </Text>
          <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
            <Button
              variant="outline"
              onClick={() => modals.closeModal(resetID)}
              mt="md"
            >
              Cancel
            </Button>
            <Button
              color="red"
              onClick={() => {
                modals.closeModal(resetID);
                showNotification({
                  title: "Reset Email Sent",
                  message: "This is a future functionality",
                  autoClose: 3000,
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

  const openDeleteModal = ({ row }: any) => {
    const deleteID = modals.openModal({
      title: "Delete User",
      children: (
        <>
          <Text>Are you sure you want to delete {row.name} from SIMS?</Text>
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
              onClick={() => modals.closeModal(deleteID)}
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
    <tr key={row.name}>
      <td>
        <Anchor sx={(theme) => ({ fontSize: 12 })} href="#">
          Access
        </Anchor>{" "}
        |{" "}
        <Anchor sx={(theme) => ({ fontSize: 12 })} href="#">
          Sites
        </Anchor>
      </td>
      <td>
        <Group spacing="xs" noWrap={true}>
          <ActionIcon
            onClick={() => openResetModal({ row })}
            size="sm"
            variant="light"
          >
            <Refresh size={15} />
          </ActionIcon>
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
      <td className={classes.td}>{row.name}</td>
      <td className={classes.td}>{row.birthday}</td>
      <td className={classes.td}>{row.sex}</td>
      <td className={classes.td}>{row.username}</td>
      <td className={classes.td}>{row.emailAddress}</td>
      <td className={classes.td}>{row.mobileNumber}</td>
      <td className={classes.td}>{row.landline}</td>
      <td className={classes.td}>{row.address}</td>
      <td className={classes.td}>{row.organization}</td>
    </tr>
  ));
  return (
    <>
      <Group mb="md">
        <TextInput
          placeholder="Search by any field"
          icon={<Search size={14} />}
          value={search}
          onChange={handleSearchChange}
        />
        <Button
          onClick={() => {
            openAddModal();
          }}
        >
          Add
        </Button>
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
            <tr>
              <th></th>
              <th>Action</th>
              <Th
                sorted={sortBy === "name"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("name")}
              >
                Name
              </Th>
              <Th
                sorted={sortBy === "birthday"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("birthday")}
              >
                Birthday
              </Th>
              <Th
                sorted={sortBy === "sex"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("sex")}
              >
                Sex
              </Th>
              <Th
                sorted={sortBy === "username"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("username")}
              >
                Username
              </Th>
              <Th
                sorted={sortBy === "emailAddress"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("emailAddress")}
              >
                Email Address
              </Th>
              <Th
                sorted={sortBy === "mobileNumber"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("mobileNumber")}
              >
                Mobile Number
              </Th>
              <Th
                sorted={sortBy === "landline"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("landline")}
              >
                Landline
              </Th>
              <Th
                sorted={sortBy === "address"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("address")}
              >
                Address
              </Th>
              <Th
                sorted={sortBy === "organization"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("organization")}
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
                <td colSpan={Object.keys(data).length}>
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
