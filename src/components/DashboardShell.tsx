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
import RealtimeMonitoring from "./admin/features/DeviceManagement/RealtimeMonitoring";
import ServiceOrders from "./ServiceOrders";
import { Feedback } from "./Feedback";
import { ChangePasswordForm } from "./ChangePasswordForm";
import Reports from "./Reports";
import BaitStationMonitoring from "./BaitStationMonitoring";
import ServiceManagement from "./admin/features/ServiceManagement/ServiceManagement";
import { getAssignedLocation } from "../api/user";
import ClientManagement from "./admin/features/ClientManagement/ClientManagement";
import TrendsAndReports from "./admin/TrendsAndReports";
import { notifData } from "../components/admin/dummyData";
import { NotFoundTitle } from "./Page404";
import UserAccess from "./admin/features/UserManagement/UserAccess";
import UserSites from "./admin/features/UserManagement/UserSites";
import UserPermissions from "./admin/features/UserManagement/UserPermissions";
import ServiceTasks from "./admin/features/ServiceManagement/ServiceTasks";
import ServiceAreas from "./admin/features/ServiceManagement/ServiceAreas";
import AreaMonitoringTable from "./admin/features/AreaManagement/AreaMonitoringTable";
import AreaInformationTable from "./admin/features/AreaManagement/AreaInformationTable";
import PestIncidenceMap from "./admin/features/AreaManagement/PestIncidenceMap";
import CriticalPests from "./admin/features/AreaManagement/CriticalPests";
import AreaThresholdTable from "./admin/features/AreaManagement/AreaThresholdTable";
import DeviceInformation from "./admin/features/DeviceManagement/DeviceInformation";
import DeviceMonitoring from "./admin/features/DeviceManagement/DeviceMonitoring";
import DeviceThreshold from "./admin/features/DeviceManagement/DeviceThreshold";
import UserInformation from "./admin/features/UserManagement/UserInformation";
import UserRoles from "./admin/features/UserManagement/UserRoles";
import ClientInformation from "./admin/features/ClientManagement/ClientInformation";
import ClientSitesTable from "./admin/features/ClientManagement/ClientSitesTable";
import ClientContractsInfo from "./admin/features/ClientManagement/ClientContractInfo";
import SiteAreaInfo from "./admin/features/ClientManagement/SiteAreaInfo";
import SiteContactPerson from "./admin/features/ClientManagement/SiteContactPerson";

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
            <Route path="/service-areas/:id" element={<ServiceAreas />} />
            <Route path="/user/information" element={<UserInformation />} />
            <Route path="/user/roles" element={<UserRoles />} />
            <Route
              path="/user/information/access/:userName"
              element={<UserAccess />}
            />
            <Route
              path="/user/information/sites/:userName"
              element={<UserSites />}
            />
            <Route
              path="/user/roles/permissions/:Name"
              element={<UserPermissions />}
            />
            <Route path="/device/information" element={<DeviceInformation />} />
            <Route path="device/monitoring" element={<DeviceMonitoring />} />
            <Route
              path="/device/realtime-monitoring"
              element={<RealtimeMonitoring />}
            />

            <Route path="/device/threshold" element={<DeviceThreshold />} />

            <Route path="/area/monitoring" element={<AreaMonitoringTable />} />
            <Route
              path="/area/information"
              element={<AreaInformationTable />}
            />
            <Route path="/area/threshold" element={<AreaThresholdTable />} />
            <Route path="/area/pest-incidence" element={<PestIncidenceMap />} />
            <Route path="/area/critical-pests" element={<CriticalPests />} />

            <Route path="/client-management" element={<ClientManagement />} />
            <Route path="/client/information" element={<ClientInformation />} />
            <Route
              path="/client/information/sites/:id"
              element={<ClientSitesTable />}
            />
            <Route
              path="/client/information/sites/:id/contracts/:siteID"
              element={<ClientContractsInfo />}
            />

            <Route
              path="/client/information/sites/:id/areas/:siteID"
              element={<SiteAreaInfo />}
            />

            <Route
              path="/client/information/sites/:id/contacts/:siteID"
              element={<SiteContactPerson />}
            />

            <Route path="/trends-reports" element={<TrendsAndReports />} />
            {/* <Route
              path="/bait-monitoring"
              element={<BaitStationMonitoring />}
            /> */}
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
            {/* <Route
              path="/bait-monitoring"
              element={<BaitStationMonitoring />}
            /> */}
            <Route path="/change-password" element={<ChangePasswordForm />} />
          </>
        )}
      </Routes>
    </AppShell>
  );
};

export default DashboardShell;
