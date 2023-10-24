import ChatList from "examples/Message";
import SignIn from "layouts/authentication/sign-in";
import Dashboard from "layouts/dashboard";
import Notifycations from "layouts/notifications";
import Profile from "layouts/profile";
import Appointment from "layouts/tables/Appointment";
import Property from "layouts/tables/Property";
import ManageCustomer from "layouts/customer";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import useAuth from "./useAuth";
import AddUser from "layouts/customer/AddCustomer";
import DetailUser from "layouts/customer/DetailCustomer";
import ManageUser from "layouts/user";
import RecovertyProperty from "layouts/property/RecovertyProperty";
import AssignProperty from "layouts/property/AssignProperty";
import AssignPropertyDetail from "layouts/property/AssignPropertyDetail";
import ActiveProperty from "layouts/property/ActiveProperty";

function ProtectRoute() {
  const user = useAuth();
  const isAuthenticated = !!user?.id;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

function useRouteElements() {
  const myRoute = [
    {
      path: "/login",
      element: <SignIn />,
    },
    {
      path: "/",
      element: <SignIn />,
    },
    {
      element: <ProtectRoute />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/manage-customer",
          element: <ManageCustomer />,
        },
        {
          path: "/assign-property",
          element: <AssignProperty />,
        },
        {
          path: "/active-property",
          element: <ActiveProperty />,
        },
        {
          path: "/recovery-property",
          element: <RecovertyProperty />,
        },
        {
          path: "/manage-staff",
          element: <ManageUser />,
        },
        {
          path: "/detail/:id",
          element: <DetailUser />,
        },
        {
          path: "/add-user",
          element: <AddUser />,
        },
        {
          path: "/notifications-p",
          element: <Notifycations />,
        },
        {
          path: "/my-appointment",
          element: <Appointment />,
        },

        {
          path: "/my-properties",
          element: <Property />,
        },
        {
          path: "/assign-property/:id",
          element: <AssignPropertyDetail />,
        },
        {
          path: "/chat",
          element: <ChatList />,
        },

        {
          route: "/profile",
          element: <Profile />,
        },
      ],
    },
    {
      path: "*",
      element: <h1>Not found</h1>,
    },
  ];
  return useRoutes(myRoute);
}

export default useRouteElements;
