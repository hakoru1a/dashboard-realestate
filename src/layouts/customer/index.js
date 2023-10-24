import { Add, Delete, List } from "@mui/icons-material";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContentText,
  Button,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import customerApi from "apis/customer.api";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const columns = [
  { Header: "status", accessor: "status", align: "left" },
  { Header: "fullname", accessor: "fullname", align: "left" },
  { Header: "email", accessor: "email", align: "center" },
  { Header: "phone number", accessor: "phone", align: "center" },
  { Header: "action", accessor: "action", width: "30%", align: "center" },
];

function ManageCustomer() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const handleClickOpen = (id) => {
    setCurrent(id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const { data, isFetching } = useQuery({
    queryFn: () => customerApi.getAllCustomer(),
    queryKey: ["customers", "all"],
  });
  const handleDelete = () => {
    console.log(current);
  };
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: () => {},
    onSuccess: () => {
      toast.success("Xoá thành công");
      queryClient.invalidateQueries({
        queryKey: ["customers", "all"],
        exact: true,
      });
    },
  });

  let rows = [];
  if (data) {
    rows = data.data.data.map((item) => {
      const fullname = item?.fullname || "cde";
      const status = item?.isActive || false;
      const email = item?.email || "chudev@gmail.com";
      const phone = item?.phone || "0334436231";
      return {
        status: (
          <MDTypography variant="h6" color={`${status ? "success" : "error"}`}>
            {status ? "ACTIVE" : "DEACTIVE"}
          </MDTypography>
        ),
        fullname: fullname,
        email: email,
        phone: phone,
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
              onClick={() => navigate(`/detail/${item.id || 0}/?roleId=0`)}
            >
              Detail
            </MDButton>
            {/* <MDButton
              variant="contained"
              color="error"
              startIcon={<Delete />}
              onClick={() => handleClickOpen(item.id)}
            >
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete user confirm"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            "Cảnh Báo: Bạn đang chuẩn bị xoá tài khoản của một khách hàng. Hãy chắc chắn rằng bạn đã
            xác nhận và đã thảo luận với khách hàng về quyết định này. Xoá tài khoản sẽ dẫn đến mất
            mát tất cả dữ liệu và thông tin liên quan đến tài khoản này và không thể hoàn tác. Bạn
            có chắc chắn muốn tiếp tục?"
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleDelete} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <DashboardNavbar />
      <MDBox style={{ textAlign: "right" }}>
        <MDButton
          variant="contained"
          color="secondary"
          startIcon={<Add />}
          onClick={() => navigate("/add-user")}
        >
          ADD CUSTOMER
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

export default ManageCustomer;
