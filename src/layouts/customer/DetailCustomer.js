import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customerApi from "apis/customer.api";
import userApi from "apis/user.api";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import useQueryParams from "hooks/useQueryParams";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
const init = {
  username: "",
  email: "",
  phone: "",
  fullname: "",
  role: {
    id: -1,
    roleName: "",
  },
  isActive: false,
  password: "ou@123",
};
function DetailUser() {
  const [formData, setFormData] = useState(init);

  const { id } = useParams();
  const t = useQueryParams();
  const roleId = t.roleId || 1;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name !== "role")
      setFormData({
        ...formData,
        [name]: value,
      });
    else {
      setFormData({
        ...formData,
        role: {
          id: value,
          roleName: value === 1 ? "ADMIN" : "STAFF",
        },
      });
    }
  };
  const { data } = useQuery({
    queryFn: () => {
      if (Number(roleId) === 0) {
        return customerApi.getDetailsCustomer(Number(id));
      }
      return userApi.getDetailsUser(Number(id));
    },
    queryKey: ["customer", "detail"],
  });
  useEffect(() => {
    if (data) {
      setFormData(data?.data.data);
    }
  }, [data]);
  const queryClient = useQueryClient();
  const changeStatusMutation = useMutation({
    mutationFn: (status) => {
      if (Number(roleId) === 0) {
        return customerApi.changeStatus({ active: status }, id);
      } else {
        return userApi.changeStatus({ active: status }, id);
      }
    },
    onSuccess: () => {
      toast.success("Thay đổi trạng thái thành công");
      queryClient.invalidateQueries({
        queryKey: ["customer", "detail"],
        exact: true,
      });
    },
  });
  const updateProfileMutation = useMutation({
    mutationFn: (data) => {
      if (Number(roleId) === 0) return customerApi.updateCustomer(data, id);
      else return userApi.updateUser(data, id, Number(formData.role.id));
    },
    onSuccess: () => {
      toast.success("Thay đổi thông tin");
      queryClient.invalidateQueries({
        queryKey: ["customer", "detail"],
        exact: true,
      });
    },
  });
  const handleSubmit = () => {
    updateProfileMutation.mutate(formData);
  };
  if (changeStatusMutation.isLoading || updateProfileMutation.isLoading)
    return <CircularProgress variant="determinate" value={100} />;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <FormControl
          sx={{
            width: "60%",
          }}
        >
          <TextField
            name="username"
            fullWidth
            label="Username"
            style={{ marginBottom: "10px" }}
            value={formData.username}
            onChange={handleInputChange}
          />
          <TextField
            name="email"
            fullWidth
            label="Email"
            type="email"
            style={{ marginBottom: "10px" }}
            value={formData.email}
            onChange={handleInputChange}
          />

          <TextField
            name="phone"
            fullWidth
            label="Phone number"
            type="phone"
            style={{ marginBottom: "10px" }}
            value={formData.phone}
            onChange={handleInputChange}
          />
          <TextField
            name="fullname"
            fullWidth
            label="Fullname"
            type="text"
            style={{ marginBottom: "10px" }}
            value={formData.fullname}
            onChange={handleInputChange}
          />

          {Number(roleId) !== 0 && (
            <FormControl style={{ marginBottom: "10px" }}>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                name="role"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formData?.role?.id || Number(roleId)}
                onChange={handleInputChange}
                sx={{ padding: "10px" }}
              >
                <MenuItem selected={Number(roleId) === 1} value={1}>
                  ADMIN
                </MenuItem>
                <MenuItem selected={Number(roleId) === 2} value={2}>
                  STAFF
                </MenuItem>
              </Select>
            </FormControl>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {formData.isActive ? (
              <MDButton
                color="secondary"
                style={{ width: "50%" }}
                onClick={() => changeStatusMutation.mutate(false)}
              >
                Vô hiệu hoá
              </MDButton>
            ) : (
              <MDButton
                color="primary"
                style={{ width: "50%" }}
                onClick={() => changeStatusMutation.mutate(true)}
              >
                Kích hoạt
              </MDButton>
            )}
            <MDButton color="success" style={{ width: "50%" }} onClick={handleSubmit}>
              Chỉnh sửa
            </MDButton>
          </div>
        </FormControl>
      </MDBox>
    </DashboardLayout>
  );
}

export default DetailUser;
