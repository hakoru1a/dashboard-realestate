import { useQuery } from "@tanstack/react-query";
import propertyApi from "apis/property.api";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const columns = [
  { Header: "id", accessor: "id", align: "left" },
  { Header: "property", accessor: "property", align: "left" },
  { Header: "address", accessor: "address", align: "left" },
  { Header: "purpose", accessor: "purpose", align: "center" },
  { Header: "owner", accessor: "owner", align: "center" },
  { Header: "action", accessor: "action", width: "30%", align: "center" },
];
// const rows = [
//   {
//     property: "ABC",
//     address: "TPHCM",
//     purpose: "ABC",
//     owner: "CDE",
//     action: (
//       <MDButton variant="contained" color="success">
//         Giao ngay
//       </MDButton>
//     ),
//   },
// ];
function AssignProperty() {
  const [rows, setRows] = useState([]);
  const { data, isFetching } = useQuery({
    queryFn: () => propertyApi.getAllProperty(),
    queryKey: ["manage", "property"],
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (data) {
      const r = data?.data.data.map((item) => {
        return {
          id: item.id,
          property: item?.propertyName,
          address: item?.address,
          purpose: item?.purpose.replace("_", " "),
          owner: item?.customer.fullname,
          action: (
            <MDButton
              variant="contained"
              color="success"
              onClick={() => navigate(`/assign-property/${item.id}`)}
            >
              Giao ngay
            </MDButton>
          ),
        };
      });
      setRows(r);
    }
  }, [data]);
  if (isFetching) return <CircularProgress color="secondary" />;
  return (
    <DashboardLayout>
      <DashboardNavbar />
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

export default AssignProperty;
