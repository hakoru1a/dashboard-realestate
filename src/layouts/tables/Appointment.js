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

// @mui material components

// Material Dashboard 2 React components

// Material Dashboard 2 React example components
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import TimeTable from "examples/TimeTable";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";

function Appointment() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <TimeTable />
      <Footer />
    </DashboardLayout>
  );
}

export default Appointment;
