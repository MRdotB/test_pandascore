import React, {PropTypes} from 'react';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer
} from 'recharts';

function toPercent(decimal, fixed = 0) {
	return `${(decimal).toFixed(fixed)}%`;
}

function labelFormat(label) {
	return `${label}%`;
}

function LaneChart(props) {
	return (
		<ResponsiveContainer>
			<BarChart width={600} height={300} data={props.data}>
				<XAxis dataKey="name"/>
				<YAxis tickFormatter={toPercent}/>
				<CartesianGrid strokeDasharray="3 3"/>
				<Tooltip/>
				<Legend/>
				<Bar label={labelFormat} dataKey="lane" fill="#8884d8"/>
			</BarChart>
		</ResponsiveContainer>
	);
}

LaneChart.propTypes = {
	data: PropTypes.object
};

export default LaneChart;
