# React 19 useTransition & useOptimistic Guide

This document describes the improvements to `useTransition` in React 19 and introduces the new `useOptimistic` hook for better user experience.

## Overview

React 19 enhances `useTransition` with better scheduling algorithms and introduces `useOptimistic` for immediate UI updates while background operations complete.

## Key Changes

### 1. useTransition Configuration
**React 18 (R18Transition.jsx:7):**
```javascript
const [isPending, startTransition] = useTransition();
```

**React 19 (R19Transition.jsx:7-10):**
```javascript
const [isPending, startTransition] = useTransition({ 
  // React 19 allows configuration options
  timeoutMs: 5000 // Optional timeout for transitions
});
```

### 2. Improved Scheduling
React 19 provides better transition scheduling:
- More intelligent prioritization of updates
- Better handling of concurrent transitions
- Improved performance for complex UIs
- Enhanced debugging capabilities

### 3. useOptimistic Hook
**React 19 introduces useOptimistic (R19Transition.jsx:36-40):**
```javascript
const [optimisticTodos, addOptimisticTodo] = useOptimistic(
  todos,
  (state, newTodo) => [...state, { ...newTodo, id: Date.now(), completed: false }]
);
```

This enables immediate UI updates while server operations are pending.

## useOptimistic Pattern

### Basic Usage
```javascript
const [optimisticState, addOptimistic] = useOptimistic(
  actualState,
  (currentState, optimisticValue) => {
    // Return new state with optimistic update
    return [...currentState, optimisticValue];
  }
);
```

### Complete Example (R19Transition.jsx:42-56)
```javascript
const addTodo = async (text) => {
  // 1. Immediately show optimistic update
  addOptimisticTodo({ text });
  
  // 2. Perform actual operation in background
  startTransition(async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    setTodos(prev => [...prev, { 
      id: Date.now(), 
      text, 
      completed: false 
    }]);
  });
};
```

## Benefits of React 19 Approach

### useTransition Improvements
1. **Better Performance**: Improved scheduling algorithms
2. **Configuration Options**: Customizable timeout and behavior
3. **Enhanced Debugging**: Better dev tools integration
4. **Concurrent Handling**: Better management of multiple transitions
5. **Memory Efficiency**: Optimized memory usage for large datasets

### useOptimistic Benefits
1. **Instant Feedback**: UI updates immediately
2. **Better UX**: No loading states for simple operations
3. **Error Resilience**: Easy rollback on failures
4. **Consistent State**: Maintains UI consistency during updates
5. **Simple API**: Easy to implement optimistic updates

## Common Use Cases

### Search with useTransition
```javascript
const handleSearch = (value) => {
  setSearchTerm(value); // Immediate update
  
  startTransition(() => {
    // Expensive filtering operation
    const results = expensiveSearch(value);
    setResults(results);
  });
};
```

### Optimistic Form Submission
```javascript
const submitForm = async (data) => {
  // Show success immediately
  addOptimisticUpdate(data);
  
  startTransition(async () => {
    try {
      await api.submit(data);
      // Update actual state on success
      setActualData(data);
    } catch (error) {
      // Rollback optimistic update
      removeOptimisticUpdate(data);
      showError(error);
    }
  });
};
```

### List Operations
```javascript
const deleteItem = async (id) => {
  // Hide item immediately
  addOptimistic({ type: 'DELETE', id });
  
  startTransition(async () => {
    await api.delete(id);
    setItems(prev => prev.filter(item => item.id !== id));
  });
};
```

## Migration Steps

### From React 18 useTransition
1. **Add configuration options** if needed
2. **Leverage improved scheduling** (automatic)
3. **Consider useOptimistic** for immediate updates
4. **Update error handling** for async transitions

### Implementing useOptimistic
1. **Identify operations** that benefit from optimistic updates
2. **Define optimistic reducer** function
3. **Replace immediate state updates** with optimistic ones
4. **Handle rollback scenarios** for failures
5. **Test edge cases** thoroughly

## Best Practices

### useTransition
1. **Use for expensive operations** that can be deferred
2. **Don't overuse** - not every update needs a transition
3. **Combine with useMemo/useCallback** for better performance
4. **Test with React DevTools** Profiler

### useOptimistic
1. **Use for user-initiated actions** (clicks, form submissions)
2. **Always handle failures** and rollback when needed
3. **Keep optimistic updates simple** - complex logic can cause bugs
4. **Provide feedback** when operations are pending
5. **Test network failure scenarios**

## Error Handling

```javascript
const [optimisticData, addOptimistic] = useOptimistic(data, reducer);

const handleAction = async (newItem) => {
  addOptimistic(newItem);
  
  startTransition(async () => {
    try {
      await api.save(newItem);
      setData(prev => [...prev, newItem]);
    } catch (error) {
      // Optimistic update is automatically reverted
      // Show error to user
      setError(error.message);
    }
  });
};
```

## Performance Considerations

1. **Memory Usage**: useOptimistic creates temporary state
2. **Render Frequency**: May cause additional re-renders
3. **Network Efficiency**: Balance optimism with server round-trips
4. **State Complexity**: Keep optimistic reducers simple
5. **Testing**: Thoroughly test race conditions and edge cases