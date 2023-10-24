import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { getProfileFromLS } from "utils/auth";

export const UserContext = createContext();
export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    return getProfileFromLS();
  });
  const [userOnline, setUserOnline] = useState([]);
  const [isAuthenticate, setIsAuthenticate] = useState(!!getProfileFromLS());
  const value = {
    user,
    setUserGlobal: setUser,
    isAuthenticate,
    setIsAuthenticate,
    userOnline,
    setUserOnline,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserContext;

UserProvider.propTypes = {
  children: PropTypes.node,
};
