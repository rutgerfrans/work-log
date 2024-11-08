// src/components/ListLog.jsx
import React from 'react';
import LogItem from './LogItem';
import PropTypes from 'prop-types';

const ListLog = ({ logs, selectedMonth }) => {
  const filteredLogs = logs.filter((log) => {
    const logDate = new Date(log.date);
    const logMonth = `${logDate.getFullYear()}-${String(logDate.getMonth() + 1).padStart(2, '0')}`; // Format to "yyyy-MM"
    return logMonth === selectedMonth;
  });

  return (
    <div>
      <h3>Log Entries</h3>
      {filteredLogs.map((log) => (
        <LogItem key={log.id} log={log} />
      ))}
    </div>
  );
};

ListLog.propTypes = {
  logs: PropTypes.array.isRequired,
  selectedMonth: PropTypes.string.isRequired, // Expecting "yyyy-MM" format
};

export default ListLog;
