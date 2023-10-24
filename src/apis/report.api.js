import http from "utils/http";

const reportApi = {
  getAppoinment: () => http.get("/api/report/appointment-weekly/"),
  getPackage: () => http.get("/api/report/package-quantity/"),
  getPropertyType: () => http.get("/api/report/property-type/"),
  getUserRegister: () => http.get("/api/report/user-register/"),
  getTotalPayment: () => http.get("/api/report/total-payment/"),
};
export default reportApi;
