import axios from "axios";
import HttpStatusCode from "../constants/httpStatusCode";
import config from "../constants/config";
import { useState } from "react";

export function isAxiosError(error) {
  return axios.isAxiosError(error);
}

export function isAxiosUnprocessableEntityError(error) {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity;
}

export function isAxiosUnauthorizedError(error) {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized;
}

export function isAxiosExpiredTokenError(error) {
  return isAxiosUnauthorizedError(error) && error.response?.data?.data?.name === "EXPIRED_TOKEN";
}

export function formatCurrency(currency) {
  return new Intl.NumberFormat("de-DE").format(currency);
}

export function formatNumberToSocialStyle(value) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  })
    .format(value)
    .replace(".", ",")
    .toLowerCase();
}

export const rateSale = (original, sale) => Math.round(((original - sale) / original) * 100) + "%";

const removeSpecialCharacter = (str) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    ""
  );

export const generateNameId = ({ name, id }) => {
  return removeSpecialCharacter(name).replace(/\s/g, "-") + `-i-${id}`;
};

export const getIdFromNameId = (nameId) => {
  const arr = nameId.split("-i-");
  return arr[arr.length - 1];
};

export const getAvatarUrl = (avatarName) =>
  avatarName ? `${config.baseUrl}images/${avatarName}` : null;

export function convertNameToCode(name) {
  // Remove spaces and convert to lowercase
  const code = name.toLowerCase().replace(/\s/g, "_");
  return code;
}

export function useProvince() {
  const url = `https://provinces.open-api.vn/api/p`;
  const [provinces, setProvinces] = useState();
  axios.get(url).then((res) => setProvinces(res.data));
  return {
    provinces,
  };
}

export function useDistrict(provinceCode) {
  const url = `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`;
  const [districts, setDistricts] = useState();
  axios.get(url).then((res) => setDistricts(res.data));
  return {
    districts,
  };
}
export default function useWard(districtCode) {
  const url = `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`;
  const [wards, setWards] = useState();
  axios.get(url).then((res) => setWards(res.data));
  return {
    wards,
  };
}

export const getUrlQuery = (params, page) => {
  params.page = String(page || 1);
  const stringParam = new URLSearchParams(params).toString();
  return `?${stringParam}`;
};

export const convertTrueTime = (time) => {
  // Chuỗi thời gian
  const dateTimeStr = time;

  // Tạo một đối tượng Date từ chuỗi
  const date = new Date(dateTimeStr);

  // Lấy thời gian epoch (số giây từ 1970-01-01T00:00:00Z)
  const epochSeconds = date.getTime() / 1000; // Chia cho 1000 để chuyển từ mili giây sang giây

  // Lấy phần thập phân (mili giây) và chuyển đổi nó thành phần thập phân thứ hai
  const fractionalSeconds = date.getMilliseconds() / 1000;

  // Tổng cộng hai giá trị để có được số dạng "1696572328.000000000"
  return epochSeconds + fractionalSeconds;
};

export function getNextMonday() {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
  const daysUntilMonday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek; // Calculate days until next Monday
  today.setDate(today.getDate() + daysUntilMonday); // Set the date to the next Monday

  // Get day, month, and year components
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = today.getFullYear();

  return `${day}-${month}-${year}`;
}
export const convertEpochToCustomFormat = (epochTime) => {
  // Tạo một đối tượng Date từ số giây
  const date = new Date((epochTime + 7 * 3600) * 1000); // 7 giờ = 7 * 3600 giây
  // Lấy ngày, tháng, năm, giờ, phút từ đối tượng Date
  const day = String(date.getUTCDate()).padStart(2, "0"); // Đảm bảo có 2 chữ số
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
  const year = String(date.getUTCFullYear()).slice(-2); // Lấy 2 chữ số cuối của năm
  let hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  let ampm = "AM";

  // Xác định AM hoặc PM
  if (hours >= 12) {
    ampm = "PM";
    if (hours > 12) {
      hours -= 12;
    }
  }
  // Tạo chuỗi định dạng "dd/mm/yy - hh"
  const formattedTime = `${day}/${month}/${year} - ${hours}:00 ${ampm}`;

  return formattedTime;
};
export const getRandomColor = () => {
  // Tạo một màu ngẫu nhiên bằng cách sử dụng Math.random() và chuyển đổi nó thành mã màu hex.
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

export const getExceptRoute = (user) => {
  const isAdmin = user?.role?.roleName === "ROLE_ADMIN";
  const execptStaffRoute = [
    "/manage-property",
    "/manage-customer",
    "/assign-property",
    "/active-property",
    "/recovery-property",
    "/manage-staff",
  ];
  const execptAdminRoute = ["/my-properties", "/notifications-p", "/my-appointment", "/chat"];
  if (isAdmin) return execptAdminRoute;
  else return execptStaffRoute;
};
