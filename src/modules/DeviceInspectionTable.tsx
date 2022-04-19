import React, { useEffect, useState } from 'react'
import { File } from 'tabler-icons-react';
import { Table, ScrollArea, createStyles, Text, Modal, useMantineTheme, Group, Button, Image } from '@mantine/core';
interface DataProps {
  listData: Array<Object>,
  tableHeadings: Array<String>,
}


// Again this is all temp functionality...

const useStyles = createStyles((theme) => ({
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

export function DeviceInspectionTable({ listData, tableHeadings }: DataProps) {
  
  const [scrolled, setScrolled] = useState(false);
  const [opened, setOpened] = useState(false);
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();
  useEffect(() => {
    console.log(listData);

    listData.forEach((data: any) => {
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          console.log(key + " = " + data[key]);
        }
      }
    })
  }, []);

  const rows = (listData !== [{}]) ? listData.map((entry: any) => (
    <tr key={entry.serviceOrder}>
      <td>{entry.serviceOrder}</td>
      <td>{entry.area}</td>
      <td>{entry.deviceCode}</td>
      <td>{entry.condition}</td>
      <td>{entry.activity}</td>
      <td>
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          overlayOpacity={0.55}
        >
          <Image
        radius="md"
        src={entry.image}
        alt="Random unsplash image"
      />
        </Modal>
        <Group>
        <Button size='xs' leftIcon={<File size={15} />} onClick={() => setOpened(true)}>View</Button>
      </Group>
        </td>
      <td>{entry.dateTime}</td>
    </tr>
  )) : <Text>No Matching Records Found.</Text>

  const headings = tableHeadings.map((entry: any) => (
    <th>{entry}</th>
  ))

  return (
    <>
      <ScrollArea sx={{ height: '70vh' }} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
      <Table striped highlightOnHover horizontalSpacing="sm" verticalSpacing="lg" sx={{marginTop: 5, overflowY: 'scroll'}}>
            <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
                <tr>
                {headings}
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </Table>
        </ScrollArea>
    </>
  )
}

