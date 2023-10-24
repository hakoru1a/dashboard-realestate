import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import PropTypes from "prop-types";
export default function BarCharCustomer({ data }) {
  return (
    <BarChart
      width={300}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
      barSize={20}
    >
      <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
      <YAxis />
      <Tooltip />
      <Legend />
      <CartesianGrid strokeDasharray="3 3" />
      <Bar dataKey="value" fill="#8884d8" background={{ fill: "#eee" }} />
    </BarChart>
  );
}
BarCharCustomer.propTypes = {
  data: PropTypes.array.isRequired,
};
