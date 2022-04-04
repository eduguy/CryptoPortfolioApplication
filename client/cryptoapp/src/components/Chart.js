import React from "react";
import { Line } from "react-chartjs-2";
import {Chart as ChartJS} from "chart.js/auto";


function LineChart ({chartData}) {
    return <Line height={40} data={chartData} />

      }
export default LineChart;