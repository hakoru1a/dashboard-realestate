import http from "utils/http";

const propertyApi = {
  getPropertyNotActive: () => http.get("/api/properties/not-active/"),
  getAllProperty: () => http.get("/api/properties/get-all/"),
  getMyProperties: (staffId) => http.get(`/api/properties/my-property/${staffId}/staff/`),
  getDeletedProperties: () => http.get("/api/properties/delete-property/"),
  recoveryProperty: (id) => http.patch(`/api/properties/undeleted/${id}/`),
  deleteProperty: (id) => {
    console.log(id);
    return http.delete(`/api/properties/hard/${id}/`);
  },
  getUnmanageProperty: () => http.get("/api/properties/unmanage/"),
  assignProperty: (propertyId, staffId) =>
    http.post(`/api/properties/assign/${propertyId}/${staffId}/`),
  deletePropertyAssign: (propertyId, staffId) =>
    http.delete(`/api/properties/assign/${propertyId}/${staffId}/`),
  activeProperty: (id, data) => {
    console.log(data);
    return http.post(`/api/properties/active/${id}/`, data);
  },
};
export default propertyApi;
