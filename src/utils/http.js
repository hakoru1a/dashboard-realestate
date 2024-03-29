import axios from "axios";
import { toast } from "react-toastify";
import { URL_LOGIN, URL_LOGOUT, URL_REFRESH_TOKEN, URL_REGISTER } from "../apis/auth.api";
import config from "../constants/config";
import HttpStatusCode from "../constants/httpStatusCode";
import {
  clearLS,
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  setAccessTokenToLS,
  setProfileToLS,
  setRefreshTokenToLS,
} from "./auth";
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from "./utils";

export class Http {
  constructor() {
    this.accessToken = getAccessTokenFromLS();
    this.refreshToken = getRefreshTokenFromLS();
    this.refreshTokenRequest = null;
    this.instance = axios.create({
      baseURL: config.baseUrl,
      // timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.authorization = "Bearer " + this.accessToken;
          return config;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    // Add a response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config;
        if (url === URL_LOGIN || url === URL_REGISTER) {
          const data = response.data;
          this.accessToken = data.data.accessToken;
          this.refreshToken = data.data.refreshToken;
          setAccessTokenToLS(this.accessToken);
          setRefreshTokenToLS(this.refreshToken);
          setProfileToLS(data.data.user);
        } else if (url === URL_LOGOUT) {
          this.accessToken = "";
          this.refreshToken = "";
          clearLS();
        }
        return response;
      },
      (error) => {
        // Chỉ toast lỗi không phải 422 và 401
        if (
          ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(
            error.response?.status
          )
        ) {
          const data = error.response?.data?.data || undefined;
          const message =
            error?.response?.data.message || data?.message || error.message || data?.data?.message;
          if (data) {
            console.log(data);

            const keys = Object.keys(data);
            // console.log(keys);

            for (const k of keys) {
              console.log(data[k]?.appointmentdate);
              if (data[k]?.appointmentdate) {
                toast.error(data[k]?.appointmentdate);
              } else toast.error(k + " " + String(data[k]).toLocaleLowerCase());
            }
          } else {
            // console.log(error);
            // console.log(message);
            if (message !== "Chưa active account") toast.error(message);
          }
        }

        // Lỗi Unauthorized (401) có rất nhiều trường hợp
        // - Token không đúng
        // - Không truyền token
        // - Token hết hạn*

        // Nếu là lỗi 401
        if (isAxiosUnauthorizedError(error)) {
          const config = error.response?.config || { headers: {}, url: "" };
          const { url } = config;
          // Trường hợp Token hết hạn và request đó không phải là của request refresh token
          // thì chúng ta mới tiến hành gọi refresh token
          if (isAxiosExpiredTokenError(error) && url !== URL_REFRESH_TOKEN) {
            // Hạn chế gọi 2 lần handleRefreshToken
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshToken().finally(() => {
                  // Giữ refreshTokenRequest trong 10s cho những request tiếp theo nếu có 401 thì dùng
                  setTimeout(() => {
                    this.refreshTokenRequest = null;
                  }, 10000);
                });
            return this.refreshTokenRequest.then((access_token) => {
              // Nghĩa là chúng ta tiếp tục gọi lại request cũ vừa bị lỗi
              return this.instance({
                ...config,
                headers: { ...config.headers, authorization: access_token },
              });
            });
          }

          // Còn những trường hợp như token không đúng
          // không truyền token,
          // token hết hạn nhưng gọi refresh token bị fail
          // thì tiến hành xóa local storage và toast message

          clearLS();
          this.accessToken = "";
          this.refreshToken = "";
          console.log(error);

          toast.error(error.response?.data.data?.message || error.response?.data.message);
          // window.location.reload()
        }
        return Promise.reject(error);
      }
    );
  }
  handleRefreshToken() {
    return this.instance
      .post(URL_REFRESH_TOKEN, {
        refresh_token: this.refreshToken,
      })
      .then((res) => {
        const { access_token } = res.data.data;
        setAccessTokenToLS(access_token);
        this.accessToken = access_token;
        return access_token;
      })
      .catch((error) => {
        clearLS();
        this.accessToken = "";
        this.refreshToken = "";
        throw error;
      });
  }
}
const http = new Http().instance;
export default http;
