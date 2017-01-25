import React, {PropTypes} from 'react';
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer
} from 'recharts';

function PopularityChart(props) {
	return (
		<ResponsiveContainer>
			<AreaChart width={600} height={400} data={props.data} margin={{top: 10, right: 30, left: 0, bottom: 0}}>
				<XAxis dataKey="formattedTimestamp"/>
				<YAxis/>
				<CartesianGrid strokeDasharray="3 3"/>
				<Tooltip/>
				<Area type="basis" dataKey="games" stroke="#8884d8" fill="#8884d8"/>
			</AreaChart>
		</ResponsiveContainer>
	);
}

PopularityChart.propTypes = {
	data: PropTypes.object
};

export default PopularityChart;
