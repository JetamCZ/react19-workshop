import React, { useState, useTransition, useMemo, useOptimistic } from 'react';

const R19Transition = () => {
  const [isPending, startTransition] = useTransition({ 
    // React 19 allows configuration options
    timeoutMs: 5000 // Optional timeout for transitions
  });
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
    
    // React 19 has improved transition scheduling
    startTransition(() => {
      const filtered = allItems.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.description.toLowerCase().includes(value.toLowerCase()) ||
        item.category.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
    });
  };

  // React 19 useOptimistic for better UX
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React 19', completed: false },
    { id: 2, text: 'Use useTransition', completed: false }
  ]);
  
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, { ...newTodo, id: Date.now(), completed: false }]
  );

  const addTodo = async (text) => {
    // Optimistically add the todo
    addOptimisticTodo({ text });
    
    // Simulate server request in transition
    startTransition(async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update actual state
      setTodos(prev => [...prev, { 
        id: Date.now(), 
        text, 
        completed: false 
      }]);
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

  const [newTodoText, setNewTodoText] = useState('');

  return (
    <div>
      <h2>React 19 useTransition + useOptimistic</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Search Example (Improved Scheduling)</h3>
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ padding: '8px', width: '300px' }}
        />
        
        {isPending && (
          <div style={{ color: 'blue', marginTop: '10px' }}>
            Searching... (Better transition scheduling)
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

      <div style={{ marginBottom: '20px' }}>
        <h3>Optimistic Updates Example</h3>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <input
            type="text"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            placeholder="New todo..."
            style={{ padding: '8px', flex: 1 }}
          />
          <button 
            onClick={() => {
              if (newTodoText.trim()) {
                addTodo(newTodoText);
                setNewTodoText('');
              }
            }}
            style={{ padding: '8px 16px' }}
          >
            Add Todo
          </button>
        </div>
        
        <div style={{ border: '1px solid #ccc', padding: '10px' }}>
          {optimisticTodos.map(todo => (
            <div 
              key={todo.id} 
              style={{ 
                padding: '5px 0',
                opacity: todos.find(t => t.id === todo.id) ? 1 : 0.5
              }}
            >
              {todo.text}
              {!todos.find(t => t.id === todo.id) && (
                <span style={{ color: 'gray', fontSize: '12px' }}> (pending...)</span>
              )}
            </div>
          ))}
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

export default R19Transition;