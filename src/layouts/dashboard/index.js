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
import { Card, Grid } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// Dashboard components
// import { BarChart, LineChart, PieChart } from "@mui/x-charts";
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import BarCharCustomer from "./BarChart";
import { BarChart, Bar } from "recharts";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import MDBox from "components/MDBox";
import { useEffect, useState } from "react";
import axios from "axios";
import reportApi from "apis/report.api";
import { formatCurrency } from "utils/utils";

const data = [
  {
    day: "Monday",
    value: 2,
  },
  {
    day: "Tuesday",
    value: 1,
  },
  {
    day: "Wednesday",
    value: 3,
  },
  {
    day: "Thursday",
    value: 9,
  },
  {
    day: "Friday",
    value: 10,
  },
  {
    day: "Saturday",
    value: 11,
  },
  {
    day: "Sunday",
    value: 9,
  },
];
const pieData = [
  {
    name: "GÓI 1",
    value: 1,
  },
  {
    name: "GÓI 2",
    value: 1,
  },
  {
    name: "GÓI 3",
    value: 8,
  },
];
const barData = [
  {
    name: "FOR RENT",
    value: 5,
  },
  {
    name: "FOR SALE",
    value: 8,
  },
];
const getRandomColor = () => {
  // Tạo một màu ngẫu nhiên bằng cách sử dụng Math.random() và chuyển đổi nó thành mã màu hex.
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};
const colors = pieData.map(() => getRandomColor());
function Dashboard() {
  // const { properties, setProperties } = useContext(PropertyContext);

  // socket.on("recieve-new-property", (value) => {
  //   console.log(value);
  //   setProperties([...properties, value.property]);
  // });
  const [appointments, setAppointments] = useState([]);
  const [packages, setPackages] = useState([]);
  const [propertyType, setPropertyType] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalUser, setTotalUser] = useState(0);
  useEffect(() => {
    reportApi.getAppoinment().then((res) => {
      setAppointments(res.data.data);
    });
    reportApi.getPackage().then((res) => {
      setPackages(res.data.data);
    });
    reportApi.getPropertyType().then((res) => {
      setPropertyType(res.data.data);
    });
    reportApi.getUserRegister().then((res) => {
      setTotalUser(res.data.data);
    });
    reportApi.getTotalPayment().then((res) => {
      setTotal(res.data.data);
    });
  }, []);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={3}>
        <LineChart
          style={{
            width: "100%",
          }}
          width={1200}
          height={350}
          data={appointments}
        >
          <XAxis dataKey="day" />
          <YAxis dataKey="value" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
        <Grid xs={6}>
          <BarChart width={600} style={{ width: "100%" }} height={600} data={propertyType}>
            <Bar dataKey="value" fill="#4B0082" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="purpose" />
            <YAxis />
          </BarChart>
        </Grid>
        <Grid xs={6}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="dark"
              icon="weekend"
              title="Doanh thu"
              count={formatCurrency(total)}
              percentage={{
                color: "success",
                amount: "",
                label: "Kiểm tra ở trang sandbox ",
              }}
            />
          </MDBox>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              icon="leaderboard"
              title="Today's Users"
              count={totalUser}
              percentage={{
                color: "success",
                amount: "+2%",
                label: "than last month",
              }}
            />
          </MDBox>

          <PieChart width={600} height={300}>
            <Pie
              dataKey="value"
              data={packages}
              nameKey="purpose"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {packages?.map((entry, index) => {
                return <Cell key={`cell-${index}`} fill={colors[index]} />;
              })}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </Grid>
      </Grid>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Dashboard;
