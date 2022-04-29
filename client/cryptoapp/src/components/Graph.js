import React, { useState, useEffect, Fragment, useContext } from "react"
import baseURL from "../conn";
import { Context } from "./Login";
import LineChart from './Chart'
const Graph = (data) => {
  const [user, setUser] = useContext(Context);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });
  const getValues = async () => {
    try {
      const response = await fetch(baseURL + "history/" + user);
      const data = await response.json();
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
      await fetch(baseURL + "history/" + user, {
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