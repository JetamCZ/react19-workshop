import React, { useState, useTransition, useMemo } from 'react';

const R18Transition = () => {
  const [isPending, startTransition] = useTransition();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  // Generate fake data for demonstration
  const allItems = useMemo(() => {
    return Array.from({ length: 10000 }, (_, i) => ({
      id: i,
      name: `Item ${i}`,
      description: `Description for item ${i}`,
      category: ['Electronics', 'Books', 'Clothing', 'Home'][i % 4]
    }));
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);
    
    // In React 18, we need to manually wrap the expensive operation
    startTransition(() => {
      const filtered = allItems.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.description.toLowerCase().includes(value.toLowerCase()) ||
        item.category.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
    });
  };

  const [count, setCount] = useState(0);
  const [isPendingCount, startCountTransition] = useTransition();

  const handleExpensiveCount = () => {
    startCountTransition(() => {
      // Simulate expensive calculation
      let result = 0;
      for (let i = 0; i < 100000000; i++) {
        result += Math.random();
      }
      setCount(prev => prev + 1);
    });
  };

  return (
    <div>
      <h2>React 18 useTransition</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Search Example</h3>
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ padding: '8px', width: '300px' }}
        />
        
        {isPending && (
          <div style={{ color: 'blue', marginTop: '10px' }}>
            Searching... (Transition pending)
          </div>
        )}
        
        <div style={{ marginTop: '10px' }}>
          <strong>Results: {results.length} items</strong>
        </div>
        
        <div style={{ 
          maxHeight: '200px', 
          overflowY: 'auto', 
          border: '1px solid #ccc',
          marginTop: '10px',
          padding: '10px'
        }}>
          {results.slice(0, 50).map(item => (
            <div key={item.id} style={{ padding: '2px 0' }}>
              <strong>{item.name}</strong> - {item.category}
            </div>
          ))}
          {results.length > 50 && (
            <div style={{ fontStyle: 'italic' }}>
              ... and {results.length - 50} more items
            </div>
          )}
        </div>
      </div>

      <div>
        <h3>Expensive Operation Example</h3>
        <button 
          onClick={handleExpensiveCount}
          disabled={isPendingCount}
          style={{ padding: '10px 20px' }}
        >
          {isPendingCount ? 'Computing...' : `Count: ${count}`}
        </button>
        <p>This button performs an expensive calculation when clicked</p>
      </div>
    </div>
  );
};

export default R18Transition;