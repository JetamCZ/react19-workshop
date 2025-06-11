import React, { useEffect, useState } from 'react';

const R18MetaData = () => {
  const [currentPage, setCurrentPage] = useState('home');

  // Manual document head management in React 18
  useEffect(() => {
    // Update title
    document.title = getPageTitle(currentPage);
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', getPageDescription(currentPage));
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = getPageDescription(currentPage);
      document.head.appendChild(meta);
    }
    
    // Cleanup function (though not always reliable)
    return () => {
      // Can't easily cleanup meta tags
    };
  }, [currentPage]);

  const getPageTitle = (page) => {
    const titles = {
      home: 'Home - React 18 App',
      about: 'About Us - React 18 App',
      contact: 'Contact - React 18 App',
      products: 'Our Products - React 18 App'
    };
    return titles[page] || 'React 18 App';
  };

  const getPageDescription = (page) => {
    const descriptions = {
      home: 'Welcome to our React 18 application homepage',
      about: 'Learn more about our company and mission',
      contact: 'Get in touch with our team',
      products: 'Explore our amazing product catalog'
    };
    return descriptions[page] || 'A React 18 application';
  };


  return (
    <div style={{ 
      padding: '20px',
      minHeight: '400px'
    }}>
      <h2>React 18 Meta Data Management</h2>
      <p>Manual document head manipulation with useEffect</p>
      
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
        <h4>Current Metadata (check browser tab and view source):</h4>
        <ul>
          <li><strong>Title:</strong> {getPageTitle(currentPage)}</li>
          <li><strong>Description:</strong> {getPageDescription(currentPage)}</li>
        </ul>
      </div>

      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        <strong>React 18 Challenges:</strong>
        <ul>
          <li>Manual DOM manipulation required</li>
          <li>Complex cleanup logic</li>
          <li>No built-in deduplication</li>
          <li>Potential memory leaks</li>
        </ul>
      </div>
    </div>
  );
};

export default R18MetaData;