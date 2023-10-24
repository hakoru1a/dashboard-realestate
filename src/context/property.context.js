import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import propertyApi from "apis/property.api";

export const PropertyContext = createContext();
export function PropertyProvider({ children }) {
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    propertyApi.getPropertyNotActive().then((res) => {
      setProperties(res.data.data || []);
    });
  }, []);
  const value = {
    properties,
    setProperties,
  };
  return <PropertyContext.Provider value={value}>{children}</PropertyContext.Provider>;
}

export default PropertyContext;

PropertyProvider.propTypes = {
  children: PropTypes.node,
};
