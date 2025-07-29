import React from 'react';
import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const Test = () => {
  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar with NavLinks */}
      <div style={{ width: '200px', padding: '20px', backgroundColor: '#f0f0f0', height: '100vh' }}>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <NavLink 
            to="./routetest1" 
            style={({ isActive }) => ({
              textDecoration: 'none',
              color: isActive ? 'blue' : 'black',
              fontWeight: isActive ? 'bold' : 'normal',
            })}
          >
            Route 1
          </NavLink>
          <NavLink 
            to="./routetest2" 
            style={({ isActive }) => ({
              textDecoration: 'none',
              color: isActive ? 'blue' : 'black',
              fontWeight: isActive ? 'bold' : 'normal',
            })}
          >
            Route 2
          </NavLink>
        </nav>
      </div>

      {/* Main content */}
      <div style={{ padding: '20px' }}>
        This is a route test
        <Outlet />
      </div>
    </div>
  );
};

export default Test;
