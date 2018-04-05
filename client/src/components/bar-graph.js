import React, { Component } from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

export default class BarGraph extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.graphData,
        };
    }
    render () {
        return (
            <BarChart width={800} height={600} data={this.state.data}
                      margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis dataKey="skill_name"/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
        );
    }
};


