import React from "react";
import { CartesianGrid, Line, LineChart, Tooltip } from "recharts";

/**
 *
 * React Component for chart in crypto prices
 * @param {array} priceData
 * @param {string} color
 * @return {JSX}
 */
export const Chart = ({ priceData, color }) => {
  return (
    <LineChart width={300} height={200} data={priceData}>
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Line type="monotone" dataKey="value" stroke={color} />
    </LineChart>
  );
};
