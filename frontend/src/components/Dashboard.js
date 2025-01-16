import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <Link to="/products">Manage Products</Link>
    </div>
  );
}

export default Dashboard;
