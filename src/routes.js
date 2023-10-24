/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Profile from "layouts/profile";

// @mui icons
import Icon from "@mui/material/Icon";
import ChatList from "examples/Message";
import Notifycations from "layouts/notifications";
import Appointment from "layouts/tables/Appointment";
import Property from "layouts/tables/Property";
import ManageCustomer from "layouts/customer";
import ManageUser from "layouts/user";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Manage Customer",
    key: "manage-customer",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/manage-customer",
    component: <ManageCustomer />,
  },
  {
    type: "collapse",
    name: "Manage Staff",
    key: "manage-staff",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/manage-staff",
    component: <ManageUser />,
  },
  {
    type: "collapse",
    name: "Recovery Property",
    key: "recovery-property",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/recovery-property",
    component: <Property />,
  },

  {
    type: "collapse",
    name: "Assign Property",
    key: "assign-property",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/assign-property",
    component: <Property />,
  },
  {
    type: "collapse",
    name: "Active Property",
    key: "active-property",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/active-property",
    component: <Property />,
  },
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications-p",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications-p",
    component: <Notifycations />,
  },
  {
    type: "collapse",
    name: "My Appointment",
    key: "my-appointment",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/my-appointment",
    component: <Appointment />,
  },

  {
    type: "collapse",
    name: "My Property",
    key: "my-properties",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/my-properties",
    component: <Property />,
  },

  {
    type: "collapse",
    name: "Messages",
    key: "chat",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/chat",
    component: <ChatList />,
  },

  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
];

export default routes;
