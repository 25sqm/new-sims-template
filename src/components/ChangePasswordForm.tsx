import React from "react";
import { Link } from "react-router-dom";
import {
  createStyles,
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Group,
  Anchor,
  Center,
  Box,
} from "@mantine/core";
import { ArrowLeft } from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 26,
    fontWeight: 900,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    color: `${
      theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black
    }`,
  },

  controls: {
    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column-reverse",
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      width: "100%",
      textAlign: "center",
    },
  },
}));

export function ChangePasswordForm() {
  const { classes } = useStyles();

  return (
    <Container size={460} my={30}>
      <Title className={classes.title} align="center">
        Changing your password?
      </Title>
      <Text color="dimmed" size="sm" align="center">
        Enter your email to get a reset link
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <TextInput
          label="Your email"
          placeholder="yourname@sterix.net"
          required
        />
        <Group position="apart" mt="lg" className={classes.controls}>
          <Anchor
            component={Link}
            to="/"
            color="dimmed"
            size="sm"
            className={classes.control}
          >
            <Center inline>
              <ArrowLeft size={12} />
              <Box ml={5}>Back to homepage</Box>
            </Center>
          </Anchor>
          <Button className={classes.control}>Reset password</Button>
        </Group>
      </Paper>
    </Container>
  );
}
