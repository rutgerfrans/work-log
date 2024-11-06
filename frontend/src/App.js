import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import WorkForm from './components/WorkForm';
import ListLog from './components/ListLog';

function App() {
  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Work Hours Tracker</h1>
      <div className="mb-4">
        <WorkForm />
      </div>
      <hr />
      <ListLog />
    </div>
  );
}

export default App;
