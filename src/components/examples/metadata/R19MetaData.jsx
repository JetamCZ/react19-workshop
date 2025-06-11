import React, { useState } from 'react';

const R19MetaData = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const getPageInfo = (page) => {
    const pageInfo = {
      home: {
        title: 'Home - React 19 App',
        description: 'Welcome to our React 19 application homepage'
      },
      about: {
        title: 'About Us - React 19 App',
        description: 'Learn more about our company and mission'
      },
      contact: {
        title: 'Contact - React 19 App',
        description: 'Get in touch with our team'
      },
      products: {
        title: 'Our Products - React 19 App',
        description: 'Explore our amazing product catalog'
      }
    };
    return pageInfo[page] || pageInfo.home;
  };

  const pageInfo = getPageInfo(currentPage);

  return (
    <div style={{ 
      padding: '20px',
      minHeight: '400px'
    }}>
      {/* React 19 Native Metadata Support */}
      <title>{pageInfo.title}</title>
      <meta name="description" content={pageInfo.description} />

      <h2>React 19 Meta Data Management</h2>
      <p>Native metadata support with automatic deduplication and hoisting</p>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Current Page: {currentPage}</h3>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          {['home', 'about', 'contact', 'products'].map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              style={{
                padding: '8px 16px',
                backgroundColor: currentPage === page ? '#007bff' : '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {page.charAt(0).toUpperCase() + page.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div style={{ 
        padding: '15px', 
        border: '1px solid #ccc', 
        borderRadius: '4px',
        backgroundColor: '#f8f9fa'
      }}>
        <h4>Current Metadata (automatically managed):</h4>
        <ul>
          <li><strong>Title:</strong> {pageInfo.title}</li>
          <li><strong>Description:</strong> {pageInfo.description}</li>
        </ul>
      </div>

      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        <strong>React 19 Benefits:</strong>
        <ul>
          <li>Native JSX metadata support</li>
          <li>Automatic deduplication and hoisting</li>
          <li>No manual DOM manipulation needed</li>
          <li>Cleaner component code</li>
        </ul>
      </div>
    </div>
  );
};

export default R19MetaData;