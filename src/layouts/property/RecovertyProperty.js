import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";
import propertyApi from "apis/property.api";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import { toast } from "react-toastify";
import { Delete } from "@mui/icons-material";
import { useEffect, useState } from "react";

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

function RecovertyProperty() {
  const [rows, setRows] = useState([]);
  const { data, isFetching } = useQuery({
    queryKey: ["properties", "deleted"],
    queryFn: () => propertyApi.getDeletedProperties(),
  });
  const queryClient = useQueryClient();

  const recoverMutation = useMutation({
    mutationFn: (id) => propertyApi.recoveryProperty(id),
    onSuccess: () => {
      toast.success("Khôi phục thành công");
      queryClient.invalidateQueries({
        queryKey: ["properties", "deleted"],
        exact: true,
      });
    },
  });
  const deleteMutation = useMutation({
    mutationFn: (id) => propertyApi.deleteProperty(id),
    onSuccess: () => {
      toast.warning("Xoá thành công");
      queryClient.invalidateQueries({
        queryKey: ["properties", "deleted"],
        exact: true,
      });
    },
  });
  const handleRecovery = (id) => {
    recoverMutation.mutate(id);
  };
  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };
  useEffect(() => {
    if (data) {
      const r = data?.data.data.map((item) => {
        return {
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
              <MDButton variant="contained" color="success" onClick={() => handleRecovery(item.id)}>
                Khôi phục
              </MDButton>
              <MDButton
                variant="contained"
                color="error"
                startIcon={<Delete />}
                onClick={() => handleDelete(item.id)}
              >
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

export default RecovertyProperty;
