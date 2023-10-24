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
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import appointmentApi from "apis/apointment.api";
import propertyApi from "apis/property.api";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import AppointmentContext from "context/appointment.context";

// Material Dashboard 2 React example components
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import useAuth from "hooks/useAuth";

// Data
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { socket } from "socket";
import { convertEpochToCustomFormat } from "utils/utils";
const columns = [
  { Header: "Date and time", accessor: "author", width: "30%", align: "left" },
  { Header: "Property", accessor: "function", align: "left" },
  { Header: "Purpose", accessor: "purpose", align: "center" },
  { Header: "Owner", accessor: "owner", align: "center" },
  { Header: "action", accessor: "action", align: "center" },
];
function Notifycations() {
  // const { rows } = authorsTableData();
  const [myProperties, setMyProperties] = useState([]);
  const user = useAuth();
  const { appointments, setAppointments } = useContext(AppointmentContext);
  socket.on("push-new-apppointment-staff", (value) => {
    console.log(value);
    appointmentApi.getAppointmentNotActive().then((res) => {
      setAppointments(res.data.data || []);
    });
  });
  useEffect(() => {
    propertyApi.getMyProperties(user?.id).then((res) => {
      console.log("My Properties", res.data.data);
      setMyProperties(res.data.data);
    });
  }, [user?.id]);
  const handlePickupAppointment = (id) => {
    appointmentApi
      .pickupAppointment(id, user.id)
      .then((res) => {
        toast.success("Nhận lịch thành công");
        const newAppointments = [...appointments].filter((item) => item.id !== id);
        setAppointments(newAppointments);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const filteredAppointments = appointments?.filter((item) => {
    return myProperties.find((myProperty) => myProperty.id === item.property.id);
  });
  const rows = filteredAppointments?.map((item) => {
    return {
      author: <a>{convertEpochToCustomFormat(item?.appointmentDate)}</a>,
      function: (
        <a
          target="_blank"
          rel="noreferrer"
          href={`http://localhost:5173/property/${item?.property?.id || 1}`}
          color="red"
        >
          [LINK] - id: {item?.property?.id}
        </a>
      ),
      purpose: item?.property.purpose,
      owner: item?.customer?.fullname,
      action: (
        <Button onClick={() => handlePickupAppointment(item?.id)} variant="text">
          Nhận lịch
        </Button>
      ),
    };
  });
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Appointments
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Notifycations;
