import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import propertyApi from "apis/property.api";
import userApi from "apis/user.api";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
const propertyColumns = [
  { Header: "fullname", accessor: "fullname", align: "left" },
  { Header: "email", accessor: "email", align: "center" },
  { Header: "phone number", accessor: "phone", align: "center" },
  { Header: "action", accessor: "action", align: "center" },
];

const columns = [
  { Header: "id", accessor: "id", align: "left" },
  { Header: "address", accessor: "address", align: "left" },
  { Header: "purpose", accessor: "purpose", align: "center" },
  { Header: "owner", accessor: "owner", align: "center" },
  { Header: "action", accessor: "action", align: "center" },
];

function AssignPropertyDetail() {
  const [staffs, setStaffs] = useState([]);
  const [properties, setProperties] = useState([]);
  const [staffId, setStaffId] = useState(0);
  const { id } = useParams();
  const { data: st, refetch } = useQuery({
    queryFn: () => userApi.getAllUser(),
    queryKey: ["assign", "detail", "user"],
  });
  const { data: p } = useQuery({
    queryFn: () => propertyApi.getMyProperties(staffId),
    queryKey: ["assign", "detail", "property", staffId],
    enabled: staffId !== 0,
  });
  const handleGetProperties = (id) => {
    setStaffId(id);
  };
  useEffect(() => {
    if (st) {
      const r = st?.data.data
        .filter((item) => item.role.roleName !== "ROLE_ADMIN")
        .map((item) => {
          return {
            id: item.id,
            fullname: item.fullname,
            email: item.email,
            phone: item.phone,
            action: (
              <MDButton
                variant="contained"
                color="warning"
                onClick={() => handleGetProperties(item.id)}
              >
                Chọn
              </MDButton>
            ),
          };
        });
      setStaffs(r);
    }
  }, [st]);
  useEffect(() => {
    if (p) {
      const r = p?.data.data.map((item) => {
        return {
          id: item.id,
          address: item?.address,
          purpose: item?.purpose,
          owner: item?.customer?.fullname,
          action: (
            <MDButton
              variant="contained"
              color="error"
              onClick={() => deleteAssignMutation.mutate(item.id)}
            >
              Huỷ
            </MDButton>
          ),
        };
      });
      setProperties(r);
    }
  }, [p]);
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (staffId) => propertyApi.assignProperty(id, staffId),
    onSuccess: () => {
      toast.success("Giao nhà thành công");
      queryClient.invalidateQueries({
        queryKey: ["assign", "detail", "user"],
      });
      setStaffId(0);
      setProperties([]);
    },
  });
  const deleteAssignMutation = useMutation({
    mutationFn: (propertyId) => propertyApi.deletePropertyAssign(propertyId, staffId),
    onSuccess: () => {
      toast.success("Xoá lịch thành công");
      queryClient.invalidateQueries({
        queryKey: ["assign", "detail", "user"],
      });
      setProperties([]);
      setStaffId(0);
    },
  });
  console.log(properties);
  const isAssigned = properties.findIndex((item) => item.id === Number(id)) >= 0;
  console.log(isAssigned);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 3fr",
          gap: "0 10px",
        }}
      >
        <MDBox pt={3}>
          <DataTable
            table={{ columns: propertyColumns, rows: staffs }}
            isSorted={false}
            entriesPerPage={false}
            showTotalEntries={false}
            noEndBorder
          />
        </MDBox>
        <MDBox pt={3}>
          <DataTable
            table={{ columns, rows: properties }}
            isSorted={false}
            entriesPerPage={false}
            showTotalEntries={false}
            noEndBorder
          />
          {!isAssigned && staffId > 0 && (
            <MDButton
              variant="contained"
              color="success"
              style={{ width: "100%", marginTop: "20px" }}
              onClick={() => mutate(staffId)}
            >
              Giao thêm
            </MDButton>
          )}
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default AssignPropertyDetail;
