import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm border-bottom w-100">
      <div className="container-fluid">
        <div className="navbar-brand d-flex align-items-center">
          <div className="gradient-bg text-white rounded p-2 me-2">
            <i className="fas fa-chart-bar"></i>
          </div>
          {/* <div>
            <h5 className="mb-0 fw-bold">InsightScope</h5>
            <small className="text-muted">Product Review Analytics</small>
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
