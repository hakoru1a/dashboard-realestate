import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import appointmentApi from "apis/apointment.api";

export const AppointmentContext = createContext();
export function AppointmentProvider({ children }) {
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    appointmentApi.getAppointmentNotActive().then((res) => {
      setAppointments(res.data.data);
    });
  }, []);
  const value = {
    appointments,
    setAppointments,
  };
  return <AppointmentContext.Provider value={value}>{children}</AppointmentContext.Provider>;
}

export default AppointmentContext;

AppointmentProvider.propTypes = {
  children: PropTypes.node,
};
