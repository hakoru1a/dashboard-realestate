import React, { useState } from "react";
import { FormControl, FormGroup, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { toast } from "react-toastify";
import authApi from "apis/auth.api";
const init = {
  username: "",
  email: "",
  phone: "",
  fullname: "",
  role: "",
};
function AddUser() {
  const [formData, setFormData] = useState(init);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    // Gửi dữ liệu formData lên máy chủ hoặc thực hiện xử lý dữ liệu ở đây.
    for (const key in formData) {
      if (formData[key] === "") {
        toast.error("Tất cả các giá trị đều phải điền");
        return;
      }
    }
    if (formData.role === 0) {
      authApi
        .registerCustomer(formData)
        .then((res) => {
          setFormData(init);
          toast.success("Đăng kí thành công");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      authApi
        .registerUser(formData)
        .then((res) => {
          setFormData(init);
          toast.success("Đăng kí thành công");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

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
            value={formData?.username}
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

          <FormControl style={{ marginBottom: "10px" }}>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              name="role"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formData.role}
              onChange={handleInputChange}
              sx={{ padding: "10px" }}
            >
              <MenuItem value={0}>CUSTOMER</MenuItem>
              <MenuItem value={1}>ADMIN</MenuItem>
              <MenuItem value={2}>STAFF</MenuItem>
            </Select>
          </FormControl>
          <MDButton color="success" onClick={handleSubmit}>
            Tạo ngay
          </MDButton>
        </FormControl>
      </MDBox>
    </DashboardLayout>
  );
}

export default AddUser;
