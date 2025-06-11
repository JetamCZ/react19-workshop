import React, { useEffect } from 'react';

const R18MetaData = () => {
  useEffect(() => {
    // Update title
    document.title = "New title"
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "Welcome to our React 18 application homepage");
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = "Welcome to our React 18 application homepage"
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div style={{ 
      padding: '20px',
      minHeight: '400px'
    }}>
      <h2>React 18 Meta Management</h2>
    </div>
  );
};

export default R18MetaData;