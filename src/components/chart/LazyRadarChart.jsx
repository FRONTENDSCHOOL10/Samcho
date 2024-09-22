import React from 'react';
import PropTypes from 'prop-types';
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts';

const LazyRadarChart = ({ chartData, diaryData }) => (
  <ResponsiveContainer width="80%" height={250}>
    <RadarChart cx="50%" cy="55%" outerRadius="80%" data={chartData}>
      <PolarGrid />
      <PolarAngleAxis dataKey="subject" className="text-sm" />
      <Radar
        dataKey="frequency"
        stroke={`${diaryData.length > 0 ? '#6B97C9' : 'none'}`}
        fill={`${diaryData.length > 0 ? '#6B97C9' : 'none'}`}
        fillOpacity={`${diaryData.length > 0 ? 0.6 : 0}`}
      />
    </RadarChart>
  </ResponsiveContainer>
);

LazyRadarChart.propTypes = {
  chartData: PropTypes.arrayOf(
    PropTypes.shape({
      subject: PropTypes.string.isRequired,
      frequency: PropTypes.number.isRequired,
      fullMark: PropTypes.number.isRequired,
    })
  ).isRequired,
  diaryData: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      mood: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default React.memo(LazyRadarChart);
