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
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import propertyApi from "apis/property.api";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import useAuth from "hooks/useAuth";

// Data
import { useEffect, useState } from "react";
const columns = [
  { Header: "Property", accessor: "property", width: "25%", align: "left" },
  { Header: "Address", accessor: "address", width: "35%" },
  { Header: "Purpose", accessor: "purpose", align: "left" },
  { Header: "Price", accessor: "price", align: "center" },
];
function Property() {
  const user = useAuth();
  const [myProperties, setMyProperties] = useState([]);
  useEffect(() => {
    propertyApi.getMyProperties(user?.id).then((res) => {
      console.log("My Properties", res.data.data);
      setMyProperties(res.data.data);
    });
  }, []);
  const rows = myProperties.map((item) => {
    return {
      property: (
        <span>
          {item?.propertyName} - ID: {item.id}
        </span>
      ),
      address: <span>{item?.address}</span>,
      purpose: <span>{item?.purpose}</span>,
      price: <span>{item?.price}</span>,
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
                  My Appointment
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

export default Property;
