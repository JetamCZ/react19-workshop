# React 19 Migration Guide & Examples

A comprehensive guide showcasing how to migrate from React 18 to React 19, featuring side-by-side code examples and detailed migration documentation for all major React 19 features.

## 🚀 What's Inside

This project demonstrates the key differences between React 18 and React 19 with practical examples and migration guides for:

- **Data Fetching** - From useEffect + useState to the new `use` hook with Suspense
- **Form Handling** - From controlled components to Server Actions with `useActionState` and `useFormStatus`
- **Ref Management** - From `forwardRef` to native ref props
- **Transitions** - Enhanced `useTransition` and new `useOptimistic` hook
- **Metadata** - Native JSX support for `<title>` and `<meta>` tags
- **Performance** - React Compiler for automatic optimization

## 📚 Documentation

Each topic includes detailed migration guides with before/after code examples:

- [📡 Data Fetching Migration Guide](./docs/01-data-fetching.md) - Learn how to use the `use` hook and Suspense
- [📝 Forms Migration Guide](./docs/02-forms.md) - Master Server Actions, `useActionState`, and `useFormStatus`
- [🔗 Refs Migration Guide](./docs/03-refs.md) - Simplify ref handling without `forwardRef`
- [⚡ Transitions Guide](./docs/04-transitions.md) - Optimize UX with `useTransition` and `useOptimistic`
- [🏷️ Metadata Guide](./docs/05-meta-data.md) - Native JSX metadata management
- [🚄 Performance Guide](./docs/06-performance.md) - React Compiler and automatic optimization

## 🛠️ Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint
```

## 🎯 Key React 19 Features Covered

### Data Fetching with `use` Hook
```jsx
// React 19 - Simple and clean
const data = use(promise);
```

### Server Actions & Form State
```jsx
// React 19 - Built-in form handling
const [state, formAction] = useActionState(submitAction, initialState);
```

### Simplified Refs
```jsx
// React 19 - No more forwardRef
const MyComponent = ({ ref, ...props }) => {
  return <input ref={ref} {...props} />;
};
```

### Optimistic Updates
```jsx
// React 19 - Instant UI feedback
const [optimisticState, addOptimistic] = useOptimistic(state, reducer);
```

### Native Metadata
```jsx
// React 19 - JSX metadata support
<title>Page Title</title>
<meta name="description" content="Page description" />
```

## 🔧 Tech Stack

- **React 19** - Latest version with all new features
- **Vite** - Fast build tool and dev server
- **React Compiler** - Automatic performance optimization

## 📁 Project Structure

```
src/
├── components/examples/
│   ├── fetching/     # Data fetching examples (R18 vs R19)
│   ├── forms/        # Form handling examples (R18 vs R19)
│   ├── refs/         # Ref management examples (R18 vs R19)
│   ├── transitions/  # Transitions examples (R18 vs R19)
│   ├── metadata/     # Metadata examples (R18 vs R19)
│   └── compiler/     # React Compiler performance demos
└── docs/             # Detailed migration guides
```
