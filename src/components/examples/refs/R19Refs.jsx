import React, { useRef, useImperativeHandle } from 'react';

const R19Refs = () => {
  const inputRef = useRef(null);
  const customRef = useRef(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const callCustomMethod = () => {
    customRef.current?.customMethod();
  };

  return (
    <div>
      <h2>React 19 Refs (ref as prop)</h2>
      
      <div>
        <h3>Basic Input Ref</h3>
        <BasicInput ref={inputRef} placeholder="Basic input with ref" />
        <button onClick={focusInput}>Focus Input</button>
      </div>

      <div>
        <h3>Custom Component with useImperativeHandle</h3>
        <CustomComponent ref={customRef} />
        <button onClick={callCustomMethod}>Call Custom Method</button>
      </div>
    </div>
  );
};

// No forwardRef needed - ref is now a regular prop
const BasicInput = ({ ref, ...props }) => {
  return (
    <input
      ref={ref}
      type="text"
      style={{ margin: '10px', padding: '5px' }}
      {...props}
    />
  );
};

// Custom component with useImperativeHandle - no forwardRef wrapper
const CustomComponent = ({ ref }) => {
  const internalRef = useRef(null);

  useImperativeHandle(ref, () => ({
    customMethod: () => {
      console.log('Custom method called from R19!');
      internalRef.current?.focus();
    },
    getValue: () => internalRef.current?.value,
    reset: () => {
      if (internalRef.current) {
        internalRef.current.value = '';
      }
    }
  }));

  return (
    <div style={{ padding: '10px', border: '1px solid #ccc', margin: '10px' }}>
      <p>Custom component with imperative handle</p>
      <input
        ref={internalRef}
        type="text"
        placeholder="Internal input"
        style={{ padding: '5px' }}
      />
    </div>
  );
};

export default R19Refs;