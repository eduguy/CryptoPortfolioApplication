import React, { useState, useEffect, Fragment } from "react"

import LineChart from './Chart'
const Graph = (data) => {

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });
  const getValues = async () => {
    try {
      const response = await fetch("http://localhost:5000/history");
      const data = await response.json();
      // console.log(data);

      setChartData({
        labels: data.map((crypto) => crypto.columndatetime),
        datasets: [
          {
            label: "Total Value in USD",
            data: data.map((crypto) => crypto.portfolio_value)

          }
        ]
      });

    }
    catch (err) {
      console.error(err.message);
    }
  }
  const deleteHistory = async () => {
    try {
      await fetch("http://localhost:5000/history", {
        method: "DELETE"
      });
      setChartData({
        labels: [],
        datasets: []
      });
    }
    catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getValues();
  }, [data]);
  return (
    <Fragment>
      <button onClick={() => deleteHistory()} className="btn btn-warning">Clear History</button>
      <LineChart chartData={chartData} />
    </Fragment>
  )

}

export default Graph;