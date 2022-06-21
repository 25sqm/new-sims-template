import React from "react";
import {
  Paper,
  Text,
  TextInput,
  Textarea,
  Button,
  Group,
  createStyles,
} from "@mantine/core";
import emailjs, { sendForm } from "@emailjs/browser";
import { format } from "path";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";

const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID
  ? process.env.REACT_APP_EMAILJS_SERVICE_ID
  : "";
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID
  ? process.env.REACT_APP_EMAILJS_TEMPLATE_ID
  : "";
const PERSONAL_ID = process.env.REACT_APP_EMAILJS_ID
  ? process.env.REACT_APP_EMAILJS_ID
  : "";

const useStyles = createStyles((theme) => {
  const BREAKPOINT = theme.fn.smallerThan("sm");
  return {
    wrapper: {
      display: "flex",
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
      borderRadius: theme.radius.lg,
      padding: 4,
      border: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[2]
      }`,

      [BREAKPOINT]: {
        flexDirection: "column",
      },
    },

    form: {
      boxSizing: "border-box",
      flex: 1,
      padding: theme.spacing.xl,
      paddingLeft: theme.spacing.xl * 2,
      borderLeft: 0,

      [BREAKPOINT]: {
        padding: theme.spacing.md,
        paddingLeft: theme.spacing.md,
      },
    },

    fields: {
      marginTop: -12,
    },

    fieldInput: {
      flex: 1,

      "& + &": {
        marginLeft: theme.spacing.md,

        [BREAKPOINT]: {
          marginLeft: 0,
          marginTop: theme.spacing.md,
        },
      },
    },

    fieldsGroup: {
      display: "flex",

      [BREAKPOINT]: {
        flexDirection: "column",
      },
    },

    title: {
      marginBottom: theme.spacing.xl * 1.5,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,

      [BREAKPOINT]: {
        marginBottom: theme.spacing.xl,
      },
    },

    control: {
      [BREAKPOINT]: {
        flex: 1,
      },
    },
  };
});

export function Feedback() {
  const { classes } = useStyles();
  let navigate = useNavigate();

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const sendEmail = (e: any) => {
    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, e, PERSONAL_ID)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          showNotification({
            title: "Success!",
            message: "Thank you for your feedback! We'll make sure to note it.",
            autoClose: 3000,
            color: "green",
          });
          navigate("/");
        }
      })
      .catch((err) => {
        console.error(err);
        showNotification({
          title: "Something went wrong.",
          message: `${err}`,
          autoClose: 3000,
          color: "red",
        });
        throw err;
      });
    // console.log(e.target);

    // for testing now, have to put into an env variable
  };

  return (
    <Paper shadow="md" radius="lg" my="md">
      <div className={classes.wrapper}>
        <form
          className={classes.form}
          onSubmit={(e) => {
            e.preventDefault();
            sendEmail(e.target);
          }}
        >
          <Text size="lg" weight={700} className={classes.title}>
            How may we help you?
          </Text>
          <div className={classes.fields}>
            <TextInput
              mt="md"
              name="user_name"
              label="Name"
              placeholder="Name"
              required
              {...form.getInputProps("name")}
            />
            <TextInput
              mt="md"
              name="from_email"
              label="Email"
              placeholder="your@email.com"
              required
              {...form.getInputProps("email")}
            />
            <Textarea
              mt="md"
              label="Inquiry"
              name="message"
              placeholder="Please include all relevant information"
              minRows={3}
              {...form.getInputProps("message")}
            />
            <Group position="right" mt="md">
              <Button type="submit" className={classes.control}>
                Submit
              </Button>
            </Group>
          </div>
        </form>
      </div>
    </Paper>
  );
}
