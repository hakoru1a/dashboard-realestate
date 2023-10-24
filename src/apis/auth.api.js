import http from "utils/http";
export const URL_LOGIN = "/authenticate/";
export const URL_REGISTER = "register";
export const URL_LOGOUT = "logout";
export const URL_REFRESH_TOKEN = "refresh-access-token";
const authApi = {
  login: (username, password) =>
    http.post(URL_LOGIN, {
      username,
      password,
    }),
  registerUser: (form) => http.post(`/api/users/?roleId=${form.role || "1"}`, form),
  registerCustomer: (form) => http.post("/api/customers/", form),
};

export default authApi;
