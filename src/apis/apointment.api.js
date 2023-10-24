import http from "utils/http";

const appointmentApi = {
  getAppointmentNotActive: () => http.get("/api/appointments/staff/not-active/"),
  pickupAppointment: (appointmentId, staffId) =>
    http.post(`/api/appointments/${appointmentId}/${staffId}/staff/`),
  getMyAppointment: (staffId) => http.get(`/api/appointments/${staffId}/staff/`),
};
export default appointmentApi;
