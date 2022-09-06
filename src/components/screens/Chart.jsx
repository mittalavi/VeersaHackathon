import React, { useState, useEffect } from "react";
import { Chart } from "react-charts";

export default function Charts({ propsData }) {
  const [loading, setLoading] = useState(true);
  const chartProps = [];
  useEffect(() => {
    console.log(propsData);
    propsData.forEach((ele, i) => {
      chartProps.push([i + 1, ele.progress_rating]);
    });
    chartProps.sort((a, b) => a[0] < b[0]);
    console.log(chartProps);
    setLoading(false);
  }, []);
  const data = React.useMemo(
    () => [
      {
        data: chartProps,
      },
    ],
    []
  );

  const axes = React.useMemo(
    () => [
      { primary: true, type: "linear", position: "bottom" },
      { type: "linear", position: "left" },
    ],
    []
  );

  return (
    // A react-chart hyper-responsively and continuously fills the available
    // space of its parent element automatically
    <div
      style={{
        width: "30vw",
        height: "35vh",
      }}
    >
      {chartProps && !loading && <Chart data={data} axes={axes} />}
    </div>
  );
}
