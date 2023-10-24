/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

import { Button } from "@mui/material";
import MDBadge from "components/MDBadge";
import MDBox from "components/MDBox";

// Material Dashboard 2 React components

// Images

export default function data() {
  return {
    columns: [
      { Header: "Property", accessor: "author", width: "45%", align: "left" },
      { Header: "Purpose", accessor: "function", align: "left" },
      { Header: "Status", accessor: "status", align: "center" },
      { Header: "Employed", accessor: "employed", align: "center" },
      { Header: "Action", accessor: "action", align: "center" },
    ],

    rows: [
      {
        author: <a>Property của C</a>,
        function: "FOR RENT",
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: "",
        action: <Button variant="text">Nhận</Button>,
      },
    ],
  };
}
