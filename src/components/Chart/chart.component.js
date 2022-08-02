import React from "react";
import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/**
 *
 * React Component for chart showing time and crypto prices
 * @param {array} priceData
 * @param {string} color
 * @return {JSX}
 */
export const Chart = ({ priceData, color }) => {
  return (
    <LineChart width={300} height={200} data={priceData}>
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <XAxis axisLine={false} dataKey="name" tick={false}>
        <Label value="Time" position="outsideBottomCenter" />
      </XAxis>
      <YAxis axisLine={false} tick={false}>
        <Label value="Price" position="insideTopLeft" />
      </YAxis>
      <Line type="monotone" dataKey="value" stroke={color} dot={false} />
    </LineChart>
  );
};
