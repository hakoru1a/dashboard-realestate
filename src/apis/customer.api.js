import http from "utils/http";

const customerApi = {
  getAllCustomer: () => http.get("/api/customers/get-all/"),
  getDetailsCustomer: (id) => http.get(`/api/customers/details/${id}/`),
  changeStatus: (data, id) => http.patch(`/api/customers/change-status/${id}/`, data),
  updateCustomer: (data, id) => http.put(`/api/customers/update-profile/${id}/admin/`, data),
  deleteCustomer: (id) => http.delete(`/api/customers/${id}/`),
};
export default customerApi;
