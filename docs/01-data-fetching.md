# Migrating from React 18 to React 19 Data Fetching

This guide explains how to migrate from traditional React 18 data fetching patterns to the new React 19 approach using the `use` hook and Suspense.

## Overview

React 19 introduces the `use` hook, which simplifies data fetching by removing the need for manual state management for loading states and data handling. Instead of using `useState` and `useEffect`, you can now use `use` with promises and wrap your components in `Suspense` for automatic loading state handling.

## Before: React 18 Pattern

```jsx
import React, {useEffect, useState} from 'react';

const R18Fetching = (props) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)

        fetch("https://api.thecatapi.com/v1/images/search?limit=10")
            .then((response) => response.json())
            .then((data) => {
                setData(data)
            })
            .finally(() => setLoading(false))
    }, [])

    return (
        <>
            {loading ? "Loading..." : null}

            <div className="flex-grid">
                {
                    data?.map(img => (
                        <img src={img.url} key={img.id} alt="" style={{maxHeight: 250}}/>
                    ))
                }
            </div>
        </>
    )
}

export default R18Fetching
```

## After: React 19 Pattern

```jsx
import React, {Suspense, use} from 'react';

const promise = fetch("https://api.thecatapi.com/v1/images/search?limit=10")
    .then((response) => response.json())

const R19Fetching = () => {
    return (
        <Suspense fallback={"loading..."}>
            <R19FetchingData/>
        </Suspense>
    )
}

const R19FetchingData = () => {
    const data = use(promise)

    return (
        <>
            <div className="flex-grid">
                {
                    data?.map(img => (
                        <img src={img.url} key={img.id} alt="" style={{maxHeight: 250}}/>
                    ))
                }
            </div>
        </>
    )
}

export default R19Fetching
```

## Migration Steps

### 1. Remove State Management
- Remove `useState` for data and loading states
- Remove `useEffect` for data fetching

### 2. Create Promise Outside Component
- Move your fetch call outside the component
- Create a promise that resolves to your data

### 3. Use the `use` Hook
- Import `use` from React
- Replace your data state with `use(promise)`

### 4. Wrap with Suspense
- Create a parent component that wraps your data component
- Use `Suspense` with a `fallback` prop for loading state
- Move your data fetching logic to a separate child component

### 5. Update Imports
```jsx
// Before
import React, {useEffect, useState} from 'react';

// After
import React, {Suspense, use} from 'react';
```

## Key Benefits

1. **Simplified Code**: No manual state management for loading/data states
2. **Better Performance**: Automatic suspense integration
3. **Cleaner Component Structure**: Separation of data fetching and rendering logic
4. **Built-in Error Boundaries**: Better error handling with Suspense
5. **Concurrent Features**: Automatic integration with React's concurrent features

## Important Notes

- The `use` hook can only be called inside components wrapped with `Suspense`
- Promises should be created outside of the component to avoid recreation on every render
- For dynamic data fetching, consider using libraries like SWR or React Query that support the new patterns
- Error handling can be managed with Error Boundaries alongside Suspense