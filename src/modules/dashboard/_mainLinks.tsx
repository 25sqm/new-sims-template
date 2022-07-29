import React, { useState } from "react";
// import { GitPullRequest, AlertCircle, Messages, Database } from 'tabler-icons-react';
import {
  Dashboard,
  AlertTriangle,
  Search,
  UserSearch,
  Backpack,
  FileDescription,
  DeviceMobile,
  TriangleSquareCircle,
  ChartArea,
  Users,
  AntennaBars5,
  ChevronRight,
} from "tabler-icons-react";
import {
  ThemeIcon,
  UnstyledButton,
  Group,
  Text,
  createStyles,
  Collapse,
} from "@mantine/core";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 500,
    display: "block",
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.sm,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  link: {
    fontWeight: 500,
    display: "block",
    textDecoration: "none",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    paddingLeft: 31,
    marginLeft: 21,
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    borderLeft: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  chevron: {
    transition: "transform 200ms ease",
  },
}));

// interface MainLinkProps {
//   icon: React.ReactNode;
//   color: string;
//   label: string;
//   link?: string;
//   links?: { label: string; link: string }[];
// }

function MainLink({ icon, color, label, link, links }: any) {
  const { classes, theme } = useStyles();
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(false);
  const items = (hasLinks ? links : []).map((link) => (
    <Link to={link.link} style={{ textDecoration: "none" }}>
      <Text className={classes.link} key={link.label}>
        {link.label}
      </Text>
    </Link>
  ));

  if (hasLinks && link === undefined) {
    return (
      <>
        <UnstyledButton
          sx={(theme) => ({
            display: "block",
            width: "100%",
            padding: theme.spacing.xs,
            borderRadius: theme.radius.sm,
            color:
              theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

            "&:hover": {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[6]
                  : theme.colors.gray[0],
            },
          })}
          onClick={() => setOpened((o) => !o)}
        >
          <Group position="apart">
            <Group>
              <ThemeIcon color={color} variant="light">
                {icon}
              </ThemeIcon>

              <Text size="sm">{label}</Text>
            </Group>
            {hasLinks && (
              <ChevronRight
                className={classes.chevron}
                size={14}
                style={{
                  transform: opened
                    ? `rotate(${theme.dir === "rtl" ? -90 : 90}deg)`
                    : "none",
                }}
              />
            )}
          </Group>
        </UnstyledButton>
        {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
      </>
    );
  }

  return (
    <Link to={link} style={{ textDecoration: "none" }}>
      <UnstyledButton
        sx={(theme) => ({
          display: "block",
          width: "100%",
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color:
            theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

          "&:hover": {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
          },
        })}
      >
        <Group>
          <ThemeIcon color={color} variant="light">
            {icon}
          </ThemeIcon>

          <Text size="sm">{label}</Text>
        </Group>
      </UnstyledButton>
    </Link>
  );
}

const clientNav = [
  {
    icon: <Dashboard size={16} />,
    color: "blue",
    label: "Dashboard",
    link: "/",
  },
  {
    icon: <AlertTriangle size={16} />,
    color: "blue",
    label: "Threshold Breach Incident",
    link: "/threshold-breach",
  },
  {
    icon: <Search size={16} />,
    color: "blue",
    label: "Findings",
    link: "/findings",
  },
  {
    icon: <UserSearch size={16} />,
    color: "blue",
    label: "Real Time Monitoring",
    link: "/realtime",
  },
  {
    icon: <Backpack size={16} />,
    color: "blue",
    label: "Service Orders",
    link: "/service-orders",
  },
  {
    icon: <FileDescription size={16} />,
    color: "blue",
    label: "Reports",
    link: "/reports",
  },
  {
    icon: <DeviceMobile size={16} />,
    color: "blue",
    label: "Feedback",
    link: "/feedback",
  },
  // {
  //   icon: <TriangleSquareCircle size={16} />,
  //   color: "blue",
  //   label: "Bait Station Monitoring",
  //   link: "/bait-monitoring",
  // },
];

const adminNav = [
  {
    icon: <UserSearch size={16} />,
    color: "blue",
    label: "User Management",
    links: [
      { label: "User Information", link: "/user/information" },
      { label: "User Roles", link: "/user/roles" },
    ],
  },
  {
    icon: <FileDescription size={16} />,
    color: "blue",
    label: "Device Management",
    links: [
      { label: "Device Information", link: "/device/information" },
      { label: "Device Monitoring", link: "/device/monitoring" },
      {
        label: "Realtime Device Monitoring",
        link: "/device/realtime-monitoring",
      },
      { label: "Device Threshold", link: "/device/threshold" },
    ],
  },
  {
    icon: <Backpack size={16} />,
    color: "blue",
    label: "Service Management",
    link: "/",
  },
  {
    icon: <ChartArea size={16} />,
    color: "blue",
    label: "Area Management",
    links: [
      { label: "Area Monitoring", link: "/area/monitoring" },
      { label: "Area Information", link: "/area/information" },
      { label: "Area Threshold", link: "/area/threshold" },
      { label: "Pest Incidence Map", link: "/area/pest-incidence" },
      { label: "Critical Pests", link: "/area/critical-pests" },
    ],
  },
  {
    icon: <Users size={16} />,
    color: "blue",
    label: "Client Management",
    link: "/client-management",
  },
  {
    icon: <AntennaBars5 size={16} />,
    color: "blue",
    label: "Trends and Reports",
    link: "/trends-reports",
  },
  // {
  //   icon: <TriangleSquareCircle size={16} />,
  //   color: "blue",
  //   label: "Bait Station Monitoring",
  //   link: "/bait-monitoring",
  // },
];

export function MainLinks({ isAdmin, setIsAdmin }: any) {
  const data = isAdmin ? adminNav : clientNav;
  const links = data.map((link) => <MainLink {...link} key={link.label} />);
  return <div>{links}</div>;
}
