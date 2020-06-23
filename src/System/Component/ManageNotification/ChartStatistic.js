import React, { PureComponent } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
export default class ChartStatistic extends PureComponent {
  render() {
    return (
      <BarChart
        width={1000}
        height={300}
        data={this.props.dataChart}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Đồng ý" stackId="a" fill="#8884d8" />
        <Bar dataKey="Không đồng ý" stackId="a" fill="#82ca9d" />
        {/* <Bar dataKey="Không đánh giá" stackId="a" fill="#f56642" /> */}
      </BarChart>
    );
  }
}