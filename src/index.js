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

import App from "App";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

// Material Dashboard 2 React Context Provider
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MaterialUIControllerProvider } from "context";
import { AppointmentProvider } from "context/appointment.context";
import { MessageProvider } from "context/message.context";
import { PropertyProvider } from "context/property.context";
import { UserProvider } from "context/user.context";
import { ToastContainer } from "react-toastify";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});
const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
      <UserProvider>
        <MessageProvider>
          <PropertyProvider>
            <AppointmentProvider>
              <QueryClientProvider client={queryClient}>
                <App />
              </QueryClientProvider>
              <ToastContainer />
            </AppointmentProvider>
          </PropertyProvider>
        </MessageProvider>
      </UserProvider>
    </MaterialUIControllerProvider>
  </BrowserRouter>
);
