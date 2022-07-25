import React, { useState, useEffect } from "react";
import { Sun, MoonStars, Bell, ArrowNarrowRight } from "tabler-icons-react";
import {
  Badge,
  AppShell,
  Navbar,
  Header,
  Group,
  Text,
  ActionIcon,
  useMantineColorScheme,
  MediaQuery,
  Burger,
  Indicator,
  Popover,
  useMantineTheme,
  ScrollArea,
  Paper,
  Tooltip,
  Center,
} from "@mantine/core";
import { MainLinks } from "../modules/dashboard/_mainLinks";
import { User } from "../modules/dashboard/_user";
import { Logo } from "../modules/dashboard/_logo";
import DashboardContents from "./DashboardContents";
import { Routes, Route } from "react-router-dom";
import ThresholdBreaches from "./ThresholdBreaches";
import Findings from "./Findings";
import RealtimeMonitoring from "./RealtimeMonitoring";
import ServiceOrders from "./ServiceOrders";
import { Feedback } from "./Feedback";
import { ChangePasswordForm } from "./ChangePasswordForm";
import Reports from "./Reports";
import BaitStationMonitoring from "./BaitStationMonitoring";
import ServiceManagement from "./admin/ServiceManagement/ServiceManagement";
import DeviceManagement from "./admin/DeviceManagement";
import UserManagement from "./admin/UserManagement/UserManagement";
import { getAssignedLocation } from "../api/user";
import AreaMonitoring from "./admin/AreaMonitoring";
import ClientManagement from "./admin/ClientManagement";
import TrendsAndReports from "./admin/TrendsAndReports";
import { notifData } from "../components/admin/dummyData";
import { NotFoundTitle } from "./Page404";
import UserAccess from "./admin/UserManagement/UserAccess";
import UserSites from "./admin/UserManagement/UserSites";
import UserPermissions from "./admin/UserManagement/UserPermissions";
import ServiceTasks from "./admin/ServiceManagement/ServiceTasks";

interface AuthFormProps {
  user: any;
  setUserState: any;
  isAdmin: any;
  setIsAdmin: any;
}

const DashboardShell = ({
  user,
  setUserState,
  isAdmin,
  setIsAdmin,
}: AuthFormProps) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [opened, setOpened] = useState(false);
  const [userSite, setUserSite] = useState("");
  const [notifOpened, setNotifOpened] = useState(false);
  const [notifications, setNotifications] = useState(notifData);
  const [toolTips, setToolTips] = useState(false);
  const theme = useMantineTheme();

  const handleDeleteNotif = (id: number) => {
    const arr = notifications.filter((notif) => notif.id !== id);
    setNotifications(arr);
  };

  useEffect(() => {
    getAssignedLocation().then((site) => {
      setUserSite(site.data[0].client_location_name);
    });
  });
  return (
    <AppShell
      padding="md"
      navbarOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar
          width={{ sm: 300, lg: 350 }}
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
        >
          <Navbar.Section grow mt="xs">
            <MainLinks isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
          </Navbar.Section>
          <Navbar.Section>
            <User
              isAdmin={isAdmin}
              setIsAdmin={setIsAdmin}
              user={user}
              setUserState={setUserState}
            />
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={70} p="md">
          <MediaQuery largerThan="sm" styles={{ display: "none" }}>
            <Burger
              opened={opened}
              onClick={() => setOpened((o) => !o)}
              size="sm"
              color={theme.colors.gray[6]}
              mr="xl"
            />
          </MediaQuery>
          <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
            <Group sx={{ height: "100%" }} px={20} position="apart">
              <Logo colorScheme={colorScheme} />
              <Group direction="row">
                <Popover
                  opened={notifOpened}
                  onClose={() => setNotifOpened(false)}
                  target={
                    <Indicator
                      disabled={notifications.length > 0 ? false : true}
                      inline
                      size={10}
                      color="red"
                      withBorder
                    >
                      <ActionIcon
                        onClick={() => setNotifOpened((o) => !o)}
                        variant="default"
                        size={30}
                      >
                        <Bell size={16} />
                      </ActionIcon>
                    </Indicator>
                  }
                  width={300}
                  position="bottom"
                  placement="end"
                  withArrow
                >
                  <ScrollArea
                    sx={(theme) => ({
                      height: "200px",
                    })}
                  >
                    {notifications.length > 0 ? (
                      notifications.map((notif) => {
                        return (
                          <Paper>
                            <Group direction="column" p={10} mb={5}>
                              <Text size="sm">
                                Detected <strong>{notif.pest_name}</strong> in{" "}
                                <strong>
                                  {notif.client_location_area_name}
                                </strong>
                              </Text>
                              <Group position="apart" align="end">
                                <Text size="xs" color="dimmed">
                                  <strong>{notif.incident_datetime}</strong>
                                </Text>

                                <ActionIcon
                                  size={20}
                                  onClick={() => handleDeleteNotif(notif.id)}
                                >
                                  <Tooltip
                                    label="Mark as Read"
                                    position="bottom"
                                    placement="end"
                                  >
                                    <ArrowNarrowRight size={12} />
                                  </Tooltip>
                                </ActionIcon>
                              </Group>
                            </Group>
                          </Paper>
                        );
                      })
                    ) : (
                      <Center>
                        <Text color="dimmed">✔️ You're all caught up!</Text>
                      </Center>
                    )}
                  </ScrollArea>
                </Popover>

                <ActionIcon
                  variant="default"
                  onClick={() => toggleColorScheme()}
                  size={30}
                >
                  {colorScheme === "dark" ? (
                    <Sun size={16} />
                  ) : (
                    <MoonStars size={16} />
                  )}
                </ActionIcon>
              </Group>
            </Group>
          </MediaQuery>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Badge>{userSite}</Badge>
      <Routes>
        {isAdmin ? (
          <>
            <Route path="*" element={<NotFoundTitle />} />
            <Route index element={<ServiceManagement />} />
            <Route path="/service-tasks/:id" element={<ServiceTasks />} />
            <Route path="/user-management" element={<UserManagement />} />
            <Route
              path="/user-management/access/:userName"
              element={<UserAccess />}
            />
            <Route
              path="/user-management/sites/:userName"
              element={<UserSites />}
            />
            <Route
              path="/user-management/permissions/:Name"
              element={<UserPermissions />}
            />
            <Route path="/device-management" element={<DeviceManagement />} />
            <Route path="/area-management" element={<AreaMonitoring />} />
            <Route path="/client-management" element={<ClientManagement />} />
            <Route path="/trends-reports" element={<TrendsAndReports />} />
            <Route
              path="/bait-monitoring"
              element={<BaitStationMonitoring />}
            />
            <Route path="/change-password" element={<ChangePasswordForm />} />
          </>
        ) : (
          <>
            <Route path="*" element={<NotFoundTitle />} />
            <Route index element={<DashboardContents />} />
            <Route path="/threshold-breach" element={<ThresholdBreaches />} />
            <Route path="/findings" element={<Findings />} />
            <Route path="/realtime" element={<RealtimeMonitoring />} />
            <Route path="/service-orders" element={<ServiceOrders />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route
              path="/bait-monitoring"
              element={<BaitStationMonitoring />}
            />
            <Route path="/change-password" element={<ChangePasswordForm />} />
          </>
        )}
      </Routes>
    </AppShell>
  );
};

export default DashboardShell;
