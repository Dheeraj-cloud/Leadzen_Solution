import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApiData = () => {
   // Define state variables
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items to display per page
  const [expandedItem, setExpandedItem] = useState(null);

  // Fetch data from the Node.js server
  useEffect(() => {
    axios.get('http://localhost:5000/api/posts')
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError('Failed to fetch data from the API.');
      });
  }, []);

  // Calculate the indices for the items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  
  // Handle page change when clicking "Previous" or "Next" buttons
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Toggle expand state for a specific item
  const toggleExpand = (itemId) => {
    setExpandedItem(itemId === expandedItem ? null : itemId);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-primary">Data from the API</h2>
      {error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <div>
          {currentItems.map((item) => (
            <div key={item.id} className={`card mb-3 bg-info text-white ${expandedItem === item.id ? 'fade-in' : ''}`}>
              <div className="row">
                <div className="col-10">
                  <div className="card-body">
                    <p className="card-text">{item.name}</p>
                    {expandedItem === item.id && (
                      <div className="mt-3">
                        <p className="card-text">User_name: {item.username}</p>
                        <p className="card-text">Email: {item.email}</p>
                        <p className="card-text">Phone: {item.phone}</p>
                        <p className="card-text">Company: {item.company.name}</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-2 d-flex align-items-center justify-content-end">
                  <button
                    className="btn btn-danger"
                    onClick={() => toggleExpand(item.id)}
                  >
                    {expandedItem === item.id ? 'Hide Details' : 'Show Details'}
                  </button>
                </div>
              </div>
            </div>
          ))}
          <nav>
            <ul className="pagination justify-content-center">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button
                  className="page-link bg-primary text-white"
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Previous
                </button>
              </li>
              <li className={`page-item ${currentPage === Math.ceil(data.length / itemsPerPage) ? 'disabled' : ''}`}>
                <button
                  className="page-link bg-primary text-white"
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default ApiData;
