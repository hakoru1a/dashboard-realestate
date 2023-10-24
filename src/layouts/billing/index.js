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
import MDBox from "components/MDBox";

// Material Dashboard 2 React examples
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Billing page components
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import UserContext from "context/user.context";
import { useContext } from "react";
function Billing() {
  const { userOnline } = useContext(UserContext);
  return (
    <DashboardLayout>
      <DashboardNavbar absolute isMini />
      <MDBox mt={8}>
        {userOnline?.map((item, index) => {
          return (
            <Card key={index} sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    {item?.fullname || ""}
                  </Typography>
                </CardContent>
                <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
                  <Button>SEND MESSAGE</Button>
                </Box>
              </Box>
              <CardMedia
                component="img"
                sx={{ width: 100, margin: 0 }}
                image={item?.avatar || "https://picsum.photos/200/300"}
                alt="Live from space album cover"
              />
            </Card>
          );
        })}
      </MDBox>
    </DashboardLayout>
  );
}

export default Billing;
