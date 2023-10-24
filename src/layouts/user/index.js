import { Add, Delete, List } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import userApi from "apis/user.api";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import useAuth from "hooks/useAuth";
import { useNavigate } from "react-router-dom";

const columns = [
  { Header: "status", accessor: "status", align: "left" },
  { Header: "fullname", accessor: "fullname", align: "left" },
  { Header: "email", accessor: "email", align: "center" },
  { Header: "phone number", accessor: "phone", align: "center" },
  { Header: "role", accessor: "role", align: "center" },
  { Header: "action", accessor: "action", width: "30%", align: "center" },
];

function ManageUser() {
  const { data, isFetching } = useQuery({
    queryFn: () => userApi.getAllUser(),
    queryKey: ["users", "all"],
  });

  const navigate = useNavigate();
  const user = useAuth();
  let rows = [];
  if (data) {
    rows = data.data.data
      .filter((item) => item?.id !== user?.id)
      .map((item) => {
        const fullname = item?.fullname || "cde";
        const status = item?.isActive || false;
        const email = item?.email || "chudev@gmail.com";
        const phone = item?.phone || "0334436231";
        const role = item?.role.roleName.replace("ROLE_", "") || "ADMIN";
        return {
          status: (
            <MDTypography variant="h6" color={`${status ? "success" : "error"}`}>
              {status ? "ACTIVE" : "DEACTIVE"}
            </MDTypography>
          ),
          fullname: fullname,
          email: email,
          phone: phone,
          role: role,
          action: (
            <div
              style={{
                display: "flex",
                gap: "0 10px",
              }}
            >
              <MDButton
                variant="contained"
                color="success"
                startIcon={<List />}
                onClick={() => navigate(`/detail/${item.id || 0}/?roleId=${item?.role.id}`)}
              >
                Detail
              </MDButton>
              {/* <MDButton variant="contained" color="error" startIcon={<Delete />}>
                Delete
              </MDButton> */}
            </div>
          ),
        };
      });
  }
  if (isFetching) return <CircularProgress color="secondary" />;
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox style={{ textAlign: "right" }}>
        <MDButton
          variant="contained"
          color="secondary"
          startIcon={<Add />}
          onClick={() => navigate("/add-user")}
        >
          ADD USER
        </MDButton>
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
    </DashboardLayout>
  );
}

export default ManageUser;
