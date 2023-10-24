import { CircularProgress } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import propertyApi from "apis/property.api";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const columns = [
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
//         Khôi phục
//       </MDButton>
//     ),
//   },
// ];

function ActiveProperty() {
  const [rows, setRows] = useState([]);
  const { data, isFetching } = useQuery({
    queryKey: ["properties", "active"],
    queryFn: () => propertyApi.getPropertyNotActive(),
  });
  const queryClient = useQueryClient();

  const recoverMutation = useMutation({
    mutationFn: (id) => {
      return propertyApi.activeProperty(id, { isActive: true });
    },
    onSuccess: () => {
      toast.success("Kích thành công");
      queryClient.invalidateQueries({
        queryKey: ["properties", "active"],
        exact: true,
      });
    },
  });
  const deleteMutation = useMutation({
    mutationFn: (id) => {
      return propertyApi.deleteProperty(id);
    },
    onSuccess: () => {
      toast.warning("Xoá thành công");
      queryClient.invalidateQueries({
        queryKey: ["properties", "active"],
        exact: true,
      });
    },
  });
  const handleRecovery = (id, isActive) => {
    console.log(isActive);
    console.log(id);
    recoverMutation.mutate(id, isActive);
  };
  const handleDelete = (id) => {
    console.log(id);
    deleteMutation.mutate(id);
  };
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
            <div
              style={{
                display: "flex",
                gap: "0 10px",
              }}
            >
              {item.isActive ? (
                <MDButton
                  variant="contained"
                  color="primary"
                  onClick={() => handleRecovery(item.id, false)}
                >
                  DEACTIVE
                </MDButton>
              ) : (
                <MDButton
                  variant="contained"
                  color="primary"
                  onClick={() => handleRecovery(item.id, true)}
                >
                  Active
                </MDButton>
              )}
              <MDButton variant="contained" color="warning" onClick={() => handleDelete(item.id)}>
                Delete
              </MDButton>
            </div>
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

export default ActiveProperty;
