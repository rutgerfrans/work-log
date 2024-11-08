import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { format, parseISO, eachDayOfInterval, startOfMonth, endOfMonth } from 'date-fns';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

const HoursBarChart = ({ logs, selectedMonth, setSelectedMonth }) => {
  if (!logs || !Array.isArray(logs)) {
    return <p>No log data available.</p>;
  }

  // Aggregate hours per day per month
  const aggregatedData = {};

  logs.forEach((log) => {
    const date = parseISO(log.date);
    const month = format(date, 'yyyy-MM'); // e.g., '2024-04'
    const day = format(date, 'dd'); // e.g., '07'

    if (!aggregatedData[month]) {
      aggregatedData[month] = {};
    }

    if (!aggregatedData[month][day]) {
      aggregatedData[month][day] = 0;
    }

    aggregatedData[month][day] += log.hours;
  });

  // Get a sorted list of available months for the dropdown
  const availableMonths = Object.keys(aggregatedData).sort();

  // Prepare chart data for the selected month, including empty days
  const chartData = selectedMonth
    ? eachDayOfInterval({
        start: startOfMonth(parseISO(`${selectedMonth}-01`)),
        end: endOfMonth(parseISO(`${selectedMonth}-01`)),
      }).map((date) => {
        const day = format(date, 'dd');
        return {
          day: `Day ${day}`,
          hours: aggregatedData[selectedMonth][day] || 0,
        };
      })
    : [];

  return (
    <div style={{ width: '100%', height: 300 }}>
        <div className="d-flex align-items-center mb-2">
            <h3 className="mb-0">Overview</h3>
            <Form.Group controlId="month-select" className="mb-0 ms-2">
            <Form.Control
                as="select"
                value={selectedMonth || ''}
                onChange={(e) => setSelectedMonth(e.target.value)}
            >
                {availableMonths.map((month) => (
                <option key={month} value={month}>
                    {format(parseISO(`${month}-01`), 'MMM yyyy')}
                </option>
                ))}
            </Form.Control>
            </Form.Group>
        </div>

      {chartData.length === 0 ? (
        <p>No data to display for the selected month.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="" />
            <YAxis domain={[0, 'auto']} /> {/* Adjusts Y-axis to fit data */}
            <Tooltip />
            <Bar
              dataKey="hours" // Use hours as the data key
              fill="#007bff" // Set all bars to blue
              barSize={30} // Set the width of bars
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

HoursBarChart.propTypes = {
  logs: PropTypes.array.isRequired,
  selectedMonth: PropTypes.string.isRequired,
  setSelectedMonth: PropTypes.func.isRequired,
};

export default HoursBarChart;
