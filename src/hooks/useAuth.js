const { default: UserContext } = require("context/user.context");
const { useContext } = require("react");

const useAuth = () => {
  const { user } = useContext(UserContext);
  return user;
};
export default useAuth;
