import React, { Component } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';

class HighStock extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  async componentDidMount() {
    const res = await axios.get('https://stock-rate-count.herokuapp.com/counts');
    let { data } = res;
    data = data.map(el => [el[0] * 1000, el[1]]);
    this.setState({ data });
  }

  render() {
    const options = {
      title: {
        text: 'My Stock Chart',
      },
      series: [
        {
          name: 'Stock Count',
          data: this.state.data,
          tooltip: {
            valueDecimals: 2,
          },
        },
      ],
      chart: {
        type: 'line',
      },
    };
    return (
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          constructorType="stockChart"
          options={options}
        />
      </div>
    );
  }
}
export default HighStock;
