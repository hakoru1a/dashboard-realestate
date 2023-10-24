import http from "utils/http";

const userApi = {
  getCurrentUser: () => http.get("/authenticate/current-staff/"),
  getAllUser: () => http.get("/api/users/get-all/"),
  getDetailsUser: (id) => http.get(`/api/users/details/${id}/`),
  changeStatus: (data, id) => http.patch(`/api/users/change-status/${id}/`, data),
  updateUser: (data, id, roleId) =>
    http.put(`/api/users/update-profile/${id}/${roleId}/admin/`, data),
};

export default userApi;
